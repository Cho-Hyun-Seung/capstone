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
}

export class getFestivalbyDateDto {
  @IsNumber()
  size: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
function ApiProperty(arg0: {
  type: StringConstructor[];
}): (target: getFestivalDto, propertyKey: 'region') => void {
  throw new Error('Function not implemented.');
}
