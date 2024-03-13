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
import { getFestivalDto } from './dto/festival..dto';

@Controller('festival')
export class FestivalController {
  constructor(private festivalService: FestivalService) {}

  @Get('/all')
  getAllFestival(): Promise<Festival[]> {
    return this.festivalService.getAllFestival();
  }

  @Get('/getbydate/:startDate/:endDate')
  GetFestivalByDate(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ): Promise<Festival[]> {
    return this.festivalService.getFestivalByDate(startDate, endDate);
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
    console.log(getFestivalDto);
    return this.festivalService.getFestivalByRange(getFestivalDto);
  }
}
