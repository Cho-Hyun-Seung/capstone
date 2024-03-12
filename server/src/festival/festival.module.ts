import { Module } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { FestivalRepository } from './festival.repository';
import { FestivalController } from './festival.controller';
import { CategoryRepository } from 'src/category/category.repository';

@Module({
  controllers: [FestivalController],
  providers: [FestivalService, FestivalRepository, CategoryRepository],
})
export class FestivalModule {}
