import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FestivalService } from './festival.service';
import { Festival } from './festival.entity';
import {
  countFestivalDto,
  getFestivalDto,
  getFestivalbyDateDto,
} from './dto/festival..dto';

@Controller('festival')
export class FestivalController {
  constructor(private festivalService: FestivalService) {}

  @Get('/all')
  GetAllFestival(): Promise<Festival[]> {
    return this.festivalService.getAllFestival();
  }

  @Get('/getbydate')
  GetFestivalByDate(
    @Query() getFestivalbyDateDto: getFestivalbyDateDto,
  ): Promise<Festival[]> {
    return this.festivalService.getFestivalByDate(getFestivalbyDateDto);
  }

  // transformOption에서 설정한 옵션: 암묵적 타입변환을 허용함!!
  @Get('/getbyrange')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  GetFestivalByRange(
    @Query() getFestivalDto: getFestivalDto,
  ): Promise<Festival[]> {
    return this.festivalService.getFestivalByRange(getFestivalDto);
  }

  @Get('/count')
  CountAllFestival(@Query() countFestivalDto: countFestivalDto) {
    return this.festivalService.countAllFestival(countFestivalDto);
  }
}
