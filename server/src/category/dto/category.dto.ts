import { IsNotEmpty, IsString, isInt, isNumber } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  category_code: string;

  @IsNotEmpty()
  @IsString()
  category_name: string;

  parent?: string;
}
