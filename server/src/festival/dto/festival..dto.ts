import {
  IsArray,
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
  @IsArray()
  regions: string[] = [];

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}

export class getFestivalbyDateDto {
  @IsNumber()
  size: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}

export class countFestivalDto {
  @IsOptional()
  @IsArray()
  regions: string[] = [];

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
