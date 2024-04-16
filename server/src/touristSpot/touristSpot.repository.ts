import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, In, LessThan, Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TouristSpot } from './touristSpot.entity';
import { getTouristSpotDto } from './dto/touristSpot.dto';

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
    const { regions, pageNum, pageSize, category_code } = getTouristSpotDto;

    // Check if regions is provided and not undefined
    const regionConditions =
      regions && regions.length > 0
        ? regions.map((regionItem) => {
            return { address1: Like(`%${regionItem}%`) };
          })
        : [];

    const touristSpots: TouristSpot[] = await this.touristSpotRepository
      .createQueryBuilder()
      // .where({ category_code: In([...category_code]) })
      .andWhere(regionConditions)
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getMany();

    if (touristSpots.length === 0) {
      throw new NotFoundException(`관광지 정보가 존재하지 않습니다.`);
    }
    return touristSpots;
  }
}
