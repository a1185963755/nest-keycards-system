import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyKeyCardDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}
