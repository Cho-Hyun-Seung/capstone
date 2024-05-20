import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/category.repository';
import { TouristSpotRepository } from './touristSpot.repository';
import {
  countTouristSpotDto,
  getTouristSpotDto,
  getByCoordDto,
} from './dto/touristSpot.dto';
import { TouristSpot } from './touristSpot.entity';

@Injectable()
export class TouristSpotService {
  constructor(
    private touristSpotRepository: TouristSpotRepository,
    private categoryResository: CategoryRepository,
  ) {}

  async getTouristSpot(
    getTouristSpotDto: getTouristSpotDto,
  ): Promise<TouristSpot[]> {
    return await this.touristSpotRepository.getTouristSpot(getTouristSpotDto);
  }

  async countAllTouristSpot(
    countTouristSpotDto: countTouristSpotDto,
  ): Promise<number> {
    return await this.touristSpotRepository.countAllTouristSpot(
      countTouristSpotDto,
    );
  }

  async getByCoord(
    getByCoordDto: getByCoordDto,
  ): Promise<{ touristSpots: TouristSpot[]; distances: number[][] }> {
    return await this.touristSpotRepository.getByCoord(getByCoordDto);
  }
}
