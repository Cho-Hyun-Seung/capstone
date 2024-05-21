import { Module } from '@nestjs/common';
import { PlannerService } from './planner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlannerController } from './planner.controller';
import { PlannerRepository } from './planner.repository';
import { Planner } from './planner.entity';
import { Festival } from 'src/festival/festival.entity';
import { TouristSpot } from 'src/touristSpot/touristSpot.entity';
import { FestivalRepository } from 'src/festival/festival.repository';
import { TouristSpotRepository } from 'src/touristSpot/touristSpot.repository';
import { Category } from 'src/category/category.entity';
import { CategoryRepository } from 'src/category/category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Planner, Festival, TouristSpot, Category]),
  ],
  controllers: [PlannerController],
  providers: [
    PlannerService,
    PlannerRepository,
    FestivalRepository,
    TouristSpotRepository,
    CategoryRepository,
  ],
})
export class PlannerModule {}
