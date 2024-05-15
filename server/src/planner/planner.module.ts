import { Module } from '@nestjs/common';
import { PlannerService } from './planner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlannerController } from './planner.controller';
import { PlannerRepository } from './planner.repository';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [PlannerController],
  providers: [PlannerService, PlannerRepository],
})
export class PlannerModule {}
