import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { KeyCard, KeyCardType } from './key-card.entity';

@Entity()
export class Batch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  count: number;

  @Column({
    type: 'enum',
    enum: KeyCardType,
    default: KeyCardType.DAY,
  })
  type: KeyCardType;

  @OneToMany(() => KeyCard, (keyCard) => keyCard.batchId)
  keyCards: KeyCard[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
