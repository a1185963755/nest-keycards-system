import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { KeyCardType } from '../entities/key-card.entity';

export class CreateBatchDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  count: number;

  @IsEnum(KeyCardType)
  type: KeyCardType;
}
