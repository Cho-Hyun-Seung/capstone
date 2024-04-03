import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNumber,
} from 'class-validator';

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

export class getFestivalbyDateDto {
  @IsNumber()
  size: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
