import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNumber,
} from 'class-validator';
import { Festival } from 'src/festival/festival.entity';

export class generatePlanner {
  @IsArray()
  category_code: string[] = [];

  @IsNumber()
  lodgingX: number;

  @IsNumber()
  lodgingY: number;

  @IsNumber()
  @IsNotEmpty()
  distance: number;

  festival: Festival;
}
