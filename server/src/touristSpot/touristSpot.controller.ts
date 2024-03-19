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
import { TouristSpotService } from './touristSpot.service';

@Controller('touristspot')
export class TouristSpot {
  constructor(private touristSpotService: TouristSpotService) {}

  //   @Get('/all')
  //   getAllFestival(): Promise<TouristSpot[]> {
  //     return this.touristSpotService.getAllFestival();
  //   }
}
