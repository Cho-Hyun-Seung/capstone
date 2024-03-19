import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, In, LessThan, Like, MoreThan, Repository } from 'typeorm';

import { Tourist_Spot } from './touristSpot.entity';
import { TouristSpot } from './touristSpot.controller';

@Injectable()
export class TouristSpotRepository extends Repository<Tourist_Spot> {
  constructor(private dataSouce: DataSource) {
    super(TouristSpot, dataSouce.createEntityManager());
  }
}
