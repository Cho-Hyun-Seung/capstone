import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FestivalRepository } from './festival.repository';
import { Festival } from './festival.entity';
import { CategoryRepository } from 'src/category/category.repository';
import { Category } from 'src/category/category.entity';

@Injectable()
export class FestivalService {
  constructor(
    @InjectRepository(FestivalRepository)
    private festivalRepository: FestivalRepository,
    private cateogryResository: CategoryRepository,
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
    const festivalCategory: Category[] =
      await this.cateogryResository.getDescendantsCategory('A0207');
    return await this.festivalRepository.getFestivalByRange(
      pageNum,
      pageSize,
      festivalCategory,
    );
  }
}
