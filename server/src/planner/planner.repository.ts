import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planner } from './planner.entity';
import { TouristSpot } from 'src/touristSpot/touristSpot.entity';
import { generatePlanner } from './dto/planner.dto';
import { Festival } from 'src/festival/festival.entity';
@Injectable()
export class PlannerRepository extends Repository<Planner> {
  constructor(
    @InjectRepository(Planner)
    private readonly plannerRepository: Repository<Planner>,

    @InjectRepository(TouristSpot)
    private readonly touristSpotRepository: Repository<TouristSpot>,

    @InjectRepository(Festival)
    private readonly festivalRepository: Repository<Festival>,
  ) {
    super(
      plannerRepository.target,
      plannerRepository.manager,
      plannerRepository.queryRunner,
    );
  }

  // 받아야하는 것
  // 좌표
  // 숙소를 정했다면? => 숙소좌표 TSP 알고리즘
  // 숙소를 정하지 않았다면? => 축제를 기준으로 함
  // 2. 이동 범위
  // 3. 관광지 카테고리
  async createPlanner(generatePlanner: generatePlanner) {}
}
