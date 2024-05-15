import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planner } from './planner.entity';

@Injectable()
export class PlannerRepository extends Repository<Planner> {
  constructor(
    @InjectRepository(Planner)
    private plannerRepository: Repository<Planner>,
  ) {
    super(
      plannerRepository.target,
      plannerRepository.manager,
      plannerRepository.queryRunner,
    );
  }

  async createPlanner() {}

  // 받아야하는 것
  // 1. 숙소 좌표
  // 2. 이동 범위
  // 3. 관광지 카테고리
  async TSPAlgorithms() {}
}
