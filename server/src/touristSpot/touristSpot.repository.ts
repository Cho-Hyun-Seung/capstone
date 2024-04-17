import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, In, LessThan, Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TouristSpot } from './touristSpot.entity';
import { countTouristSpotDto, getTouristSpotDto } from './dto/touristSpot.dto';

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

  async getTouristSpot(
    getTouristSpotDto: getTouristSpotDto,
  ): Promise<TouristSpot[]> {
    let { regions, pageNum, pageSize, category_code } = getTouristSpotDto;
    category_code = category_code || [];
    const regionConditions =
      regions && regions.length > 0
        ? regions.map((regionItem) => {
            return { address1: Like(`%${regionItem}%`) };
          })
        : [];

    const touristSpots: TouristSpot[] = await this.touristSpotRepository
      .createQueryBuilder()
      .where((builder) => {
        if (category_code.length === 0) {
        } else {
          builder.where({ category_code: In(category_code) });
        }
      })
      .andWhere(regionConditions)
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getMany();

    if (touristSpots.length === 0) {
      throw new NotFoundException(`관광지 정보가 존재하지 않습니다.`);
    }
    return touristSpots;
  }

  async countAllTouristSpot(
    countFestivalDto: countTouristSpotDto,
  ): Promise<number> {
    let { regions, category_code } = countFestivalDto;
    regions = regions || [];
    category_code = category_code || [];

    const regionConditions = regions.map((regionItem) => {
      return { address1: Like(`%${regionItem}%`) };
    });

    const countFestival = await this.touristSpotRepository
      .createQueryBuilder()
      .where((builder) => {
        if (category_code.length === 0) {
        } else {
          builder.where({ category_code: In(category_code) });
        }
      })
      .andWhere(regionConditions)
      .getCount();
    console.log('countFestival', countFestival);
    return countFestival;
  }
}
