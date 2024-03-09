import { Body, Controller, Get } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { Festival } from './festival.entity';

@Controller('festival')
export class FestivalController {
  constructor(private festivalService: FestivalService) {}

  @Get('/allfestival')
  getAllFestival(): Promise<Festival[]> {
    return this.festivalService.getAllFestival();
  }

  @Get('/festivalbydate')
  GetFestivalByDate(
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate: Date,
  ): Promise<Festival[]> {
    return this.festivalService.getFestivalByDate(startDate, endDate);
  }
}
