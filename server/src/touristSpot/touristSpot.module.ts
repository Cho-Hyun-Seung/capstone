import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TouristSpot } from './touristSpot.entity';
import { Category } from 'src/category/category.entity';
import { TouristSpotController } from './touristSpot.controller';
import { TouristSpotService } from './touristSpot.service';
import { TouristSpotRepository } from './touristSpot.repository';
import { CategoryRepository } from 'src/category/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TouristSpot, Category])],
  controllers: [TouristSpotController],
  providers: [TouristSpotService, TouristSpotRepository, CategoryRepository],
})
export class TouristSpotModule {}
