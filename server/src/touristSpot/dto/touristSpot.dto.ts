import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNumber,
} from 'class-validator';

export class getTouristSpotDto {
  @IsNumber()
  @IsNotEmpty()
  pageNum: number;

  @IsNumber()
  pageSize: number;

  @IsOptional()
  @IsArray()
  regions: string[] = [];

  @IsOptional()
  @IsArray()
  category_code: string[] = [];
}

export class countTouristSpotDto {
  @IsOptional()
  @IsArray()
  regions: string[] = [''];

  @IsOptional()
  @IsArray()
  category_code: string[] = [''];
}
