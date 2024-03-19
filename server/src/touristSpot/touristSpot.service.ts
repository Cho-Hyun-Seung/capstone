import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/category.repository';
import { TouristSpotRepository } from './touristSpot.repository';

@Injectable()
export class TouristSpotService {
  constructor(
    @InjectRepository(TouristSpotRepository)
    private festivalRepository: TouristSpotRepository,
    private cateogryResository: CategoryRepository,
  ) {}
}
