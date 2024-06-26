import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FestivalRepository } from './festival.repository';
import { Festival } from './festival.entity';
import { CategoryRepository } from 'src/category/category.repository';
import { Category } from 'src/category/category.entity';
import {
  countFestivalDto,
  getFestivalDto,
  getFestivalbyDateDto,
} from './dto/festival..dto';

@Injectable()
export class FestivalService {
  constructor(
    private festivalRepository: FestivalRepository,
    private cateogryResository: CategoryRepository,
  ) {}

  async getAllFestival(): Promise<Festival[]> {
    return await this.festivalRepository.getAllFestivals();
  }

  async getFestivalByDate(
    getFestivalbyDateDto: getFestivalbyDateDto,
  ): Promise<Festival[]> {
    return await this.festivalRepository.getFestivalByDate(
      getFestivalbyDateDto,
    );
  }

  async getFestivalByRange(
    getFestivalDto: getFestivalDto,
  ): Promise<Festival[]> {
    const festivalCategory: Category[] =
      await this.cateogryResository.getDescendantsCategory('A0207');
    return await this.festivalRepository.getFestivalByRange(
      getFestivalDto,
      festivalCategory,
    );
  }

  async countAllFestival(countFestivalDto: countFestivalDto): Promise<Number> {
    const festivalCategory: Category[] =
    await this.cateogryResository.getDescendantsCategory('A0207');
    return await this.festivalRepository.countAllFestival(countFestivalDto, festivalCategory);
  }
}
