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
import { countTouristSpotDto, getTouristSpotDto } from './dto/touristSpot.dto';
import { TouristSpot } from './touristSpot.entity';

@Controller('touristspot')
export class TouristSpotController {
  constructor(private touristSpotService: TouristSpotService) {}

  @Get('/all')
  GetTouristSpot(
    @Query() getTouristSpotDto: getTouristSpotDto,
  ): Promise<TouristSpot[]> {
    return this.touristSpotService.getTouristSpot(getTouristSpotDto);
  }

  @Get('/count')
  CountAllTouristSpot(
    @Query() countTouristSpotDto: countTouristSpotDto,
  ): Promise<number> {
    return this.touristSpotService.countAllTouristSpot(countTouristSpotDto);
  }
}
