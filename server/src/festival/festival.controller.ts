import { Body, Controller, Get, Param } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { Festival } from './festival.entity';

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

  @Get('/getbyrange/:pagenum/:pagesize')
  GetFestivalByRange(
    @Param('pagenum') pageNum: number,
    @Param('pagesize') pageSize: number,
  ): Promise<Festival[]> {
    return this.festivalService.getFestivalByRange(pageNum, pageSize);
  }
}
