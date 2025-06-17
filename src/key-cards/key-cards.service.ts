import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  KeyCard,
  KeyCardStatus,
  KeyCardType,
} from './entities/key-card.entity';
import { Batch } from './entities/batch.entity';
import { CreateBatchDto } from './dto/create-batch.dto';
import { VerifyKeyCardDto } from './dto/verify-key-card.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class KeyCardsService {
  constructor(
    @InjectRepository(KeyCard)
    private keyCardRepository: Repository<KeyCard>,
    @InjectRepository(Batch)
    private batchRepository: Repository<Batch>,
  ) {}

  // 验证卡密
  async verifyKeyCard(verifyKeyCardDto: VerifyKeyCardDto): Promise<KeyCard> {
    const keyCard = await this.keyCardRepository.findOne({
      where: { code: verifyKeyCardDto.code },
    });

    if (!keyCard) {
      throw new NotFoundException('卡密不存在');
    }

    // 检查卡密状态
    if (keyCard.status === KeyCardStatus.EXPIRED) {
      throw new BadRequestException('卡密已过期');
    }

    // 检查卡密是否已被使用
    if (keyCard.status === KeyCardStatus.USED) {
      // 如果已使用，检查是否在有效期内
      if (keyCard.expireAt && keyCard.expireAt < new Date()) {
        keyCard.status = KeyCardStatus.EXPIRED;
        await this.keyCardRepository.save(keyCard);
        throw new BadRequestException('卡密已过期');
      }
      return keyCard; // 如果在有效期内，允许继续使用
    }

    // 首次使用，设置首次使用时间和过期时间
    const now = new Date();
    keyCard.firstUseTime = now;
    keyCard.status = KeyCardStatus.USED;

    // 根据卡密类型设置过期时间
    if (keyCard.type === KeyCardType.DAY) {
      const expireDate = new Date(now);
      expireDate.setDate(expireDate.getDate() + 1);
      keyCard.expireAt = expireDate;
    } else if (keyCard.type === KeyCardType.MONTH) {
      const expireDate = new Date(now);
      expireDate.setDate(expireDate.getDate() + 30);
      keyCard.expireAt = expireDate;
    }

    return this.keyCardRepository.save(keyCard);
  }

  // 创建卡密批次
  async createBatch(createBatchDto: CreateBatchDto): Promise<Batch> {
    const batch = this.batchRepository.create({
      ...createBatchDto,
    });

    const savedBatch = await this.batchRepository.save(batch);

    // 生成卡密
    await this.generateKeyCards(savedBatch);

    return savedBatch;
  }

  // 生成卡密
  private async generateKeyCards(batch: Batch): Promise<void> {
    const { count, type } = batch;

    const keyCards: KeyCard[] = [];

    for (let i = 0; i < count; i++) {
      // 生成随机卡密码
      const code = this.generateUniqueCode();

      const keyCard = this.keyCardRepository.create({
        code,
        type,
        batchId: batch.id,
        status: KeyCardStatus.UNUSED,
      });

      keyCards.push(keyCard);
    }

    // 批量保存卡密
    await this.keyCardRepository.save(keyCards);
  }

  // 生成唯一卡密码
  private generateUniqueCode(): string {
    // 生成16字符的随机字母数字字符串
    return randomBytes(8).toString('hex').toUpperCase();
  }

  // 查询所有批次
  async findAllBatches(): Promise<Batch[]> {
    return this.batchRepository.find();
  }

  // 通过批次ID查询卡密
  async findKeyCardsByBatchId(batchId: number): Promise<KeyCard[]> {
    return this.keyCardRepository.find({
      where: { batchId },
    });
  }

  // 根据状态查询卡密
  async findKeyCardsByStatus(status: KeyCardStatus): Promise<KeyCard[]> {
    return this.keyCardRepository.find({
      where: { status },
    });
  }

  // 根据卡密码查询卡密信息
  async findKeyCardByCode(code: string): Promise<KeyCard> {
    const keyCard = await this.keyCardRepository.findOne({
      where: { code },
    });

    if (!keyCard) {
      throw new NotFoundException('卡密不存在');
    }

    // 如果卡密已使用并且过期了，更新状态
    if (
      keyCard.status === KeyCardStatus.USED &&
      keyCard.expireAt &&
      keyCard.expireAt < new Date()
    ) {
      keyCard.status = KeyCardStatus.EXPIRED;
      await this.keyCardRepository.save(keyCard);
    }

    return keyCard;
  }
}
