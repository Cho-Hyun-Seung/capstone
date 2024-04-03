import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, In, LessThan, Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TouristSpot } from './touristSpot.entity';

@Injectable()
export class TouristSpotRepository extends Repository<TouristSpot> {
  constructor(
    @InjectRepository(TouristSpot)
    private touristSpotRepository: Repository<TouristSpot>,
  ) {
    super(
      touristSpotRepository.target,
      touristSpotRepository.manager,
      touristSpotRepository.queryRunner,
    );
  }
}
