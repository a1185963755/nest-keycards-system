import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum KeyCardStatus {
  UNUSED = 'unused',
  USED = 'used',
  EXPIRED = 'expired',
}

export enum KeyCardType {
  DAY = 'day',
  MONTH = 'month',
}

@Entity()
export class KeyCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({
    type: 'enum',
    enum: KeyCardStatus,
    default: KeyCardStatus.UNUSED,
  })
  status: KeyCardStatus;

  @Column({
    type: 'enum',
    enum: KeyCardType,
    default: KeyCardType.DAY,
  })
  type: KeyCardType;

  @Column({ nullable: true })
  expireAt: Date;

  @Column({ nullable: true })
  firstUseTime: Date;

  @Column({ nullable: true })
  batchId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
