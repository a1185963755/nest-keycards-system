import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { KeyCardsService } from './key-cards.service';
import { VerifyKeyCardDto } from './dto/verify-key-card.dto';
import { CreateBatchDto } from './dto/create-batch.dto';
import { KeyCard, KeyCardStatus } from './entities/key-card.entity';
import { Batch } from './entities/batch.entity';
import { RequireKeyCard } from '../decorators/require-key-card.decorator';

@Controller('key-cards')
export class KeyCardsController {
  constructor(private readonly keyCardsService: KeyCardsService) {}

  // 验证卡密接口
  @Post('verify')
  verifyKeyCard(@Body() verifyKeyCardDto: VerifyKeyCardDto): Promise<KeyCard> {
    return this.keyCardsService.verifyKeyCard(verifyKeyCardDto);
  }

  @RequireKeyCard()
  // 需要验证卡密的示例接口
  @Get('protected-data')
  getProtectedData() {
    return {
      success: true,
      message: '已通过卡密验证',
      data: {
        content: '这是受保护的数据',
        timestamp: new Date().toISOString(),
      },
    };
  }

  // 创建卡密批次
  @Post('batch')
  createBatch(@Body() createBatchDto: CreateBatchDto): Promise<Batch> {
    return this.keyCardsService.createBatch(createBatchDto);
  }

  // 获取所有批次
  @Get('batch')
  findAllBatches(): Promise<Batch[]> {
    return this.keyCardsService.findAllBatches();
  }

  // 通过批次ID查询卡密
  @Get('batch/:id')
  findKeyCardsByBatchId(@Param('id') id: string): Promise<KeyCard[]> {
    return this.keyCardsService.findKeyCardsByBatchId(+id);
  }

  // 根据状态查询卡密
  @Get('status/:status')
  findKeyCardsByStatus(
    @Param('status') status: KeyCardStatus,
  ): Promise<KeyCard[]> {
    return this.keyCardsService.findKeyCardsByStatus(status);
  }

  // 查询卡密信息（包括到期时间）
  @Get('info')
  async getKeyCardInfo(@Query('code') code: string) {
    const keyCard = await this.keyCardsService.findKeyCardByCode(code);

    // 计算剩余有效时间（毫秒）
    let remainingTime = 0;
    let remainingDays = 0;
    let isExpired = false;

    if (keyCard.status === KeyCardStatus.UNUSED) {
      return {
        code: keyCard.code,
        status: keyCard.status,
        type: keyCard.type,
        message: '卡密未使用',
        isExpired: false,
        firstUseTime: null,
        expireAt: null,
        remainingDays: null,
        remainingTime: null,
      };
    }

    if (keyCard.expireAt) {
      const now = new Date();
      if (keyCard.expireAt > now) {
        remainingTime = keyCard.expireAt.getTime() - now.getTime();
        remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
        isExpired = false;
      } else {
        isExpired = true;
      }
    }

    return {
      code: keyCard.code,
      status: keyCard.status,
      type: keyCard.type,
      firstUseTime: keyCard.firstUseTime,
      expireAt: keyCard.expireAt,
      isExpired,
      remainingDays,
      remainingTime,
      message: isExpired ? '卡密已过期' : `卡密有效，剩余${remainingDays}天`,
    };
  }
}
