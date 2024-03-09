import { Injectable, NotFoundException } from '@nestjs/common';
import { Festival } from './festival.entity';
import {
  DataSource,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';

@Injectable()
export class FestivalRepository extends Repository<Festival> {
  constructor(private dataSouce: DataSource) {
    super(Festival, dataSouce.createEntityManager());
  }

  async getAllFestivals(): Promise<Festival[]> {
    const festivals: Festival[] = await this.find();

    if (festivals.length == 0) {
      throw new NotFoundException("Can't find festival");
    }

    return festivals;
  }

  async getFestivalByDate(startDate: Date, endDate: Date): Promise<Festival[]> {
    const festivals: Festival[] = await this.find({
      where: {
        event_start_date: LessThan(endDate),
        event_end_date: MoreThan(startDate),
      },
    });

    if (festivals.length == 0) {
      throw new NotFoundException(
        `${startDate} ~ ${endDate}에 해당 축제가 존재하지 않습니다.`,
      );
    }

    return festivals;
  }
}
