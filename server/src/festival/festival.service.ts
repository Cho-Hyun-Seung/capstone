import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FestivalRepository } from './festival.repository';
import { Festival } from './festival.entity';

@Injectable()
export class FestivalService {
  constructor(
    @InjectRepository(FestivalRepository)
    private festivalRepository: FestivalRepository,
  ) {}

  async getAllFestival(): Promise<Festival[]> {
    return await this.festivalRepository.getAllFestivals();
  }

  async getFestivalByDate(startDate: Date, endDate: Date): Promise<Festival[]> {
    return await this.festivalRepository.getFestivalByDate(startDate, endDate);
  }

  async getFestivalByRange(
    pageNum: number,
    pageSize: number,
  ): Promise<Festival[]> {
    return await this.festivalRepository.getFestivalByRange(pageNum, pageSize);
  }
}
