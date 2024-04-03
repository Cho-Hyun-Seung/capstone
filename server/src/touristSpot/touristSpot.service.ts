import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/category.repository';
import { TouristSpotRepository } from './touristSpot.repository';

@Injectable()
export class TouristSpotService {
  constructor(
    private festivalRepository: TouristSpotRepository,
    private cateogryResository: CategoryRepository,
  ) {}
}
