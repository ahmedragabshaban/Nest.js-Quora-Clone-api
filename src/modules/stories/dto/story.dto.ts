import { IsNotEmpty, MinLength } from 'class-validator';

export class StoryDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;

  @IsNotEmpty()
  readonly body: string;
  
  @IsNotEmpty()
  readonly status: string;
}
