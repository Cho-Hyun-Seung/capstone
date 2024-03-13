import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class getFestivalDto {
  @IsNumber()
  @IsNotEmpty()
  pageNum: number;

  @IsNumber()
  pageSize: number;

  @IsOptional()
  @IsString()
  region: string = '';
}
