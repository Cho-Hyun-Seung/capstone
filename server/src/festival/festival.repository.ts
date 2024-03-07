import { Injectable } from '@nestjs/common';
import { Festival } from './festival.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FestivalRepository extends Repository<Festival> {
  constructor(private dataSouce: DataSource) {
    super(Festival, dataSouce.createEntityManager());
  }
}
