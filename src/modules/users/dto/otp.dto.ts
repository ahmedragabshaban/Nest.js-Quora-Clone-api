import { IsNotEmpty, MinLength } from 'class-validator';

export class OtpDto {
  @IsNotEmpty()
  readonly code: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly phoneNumber: number;

  @IsNotEmpty()
  @MinLength(6)
  readonly countryCode: number;
}
