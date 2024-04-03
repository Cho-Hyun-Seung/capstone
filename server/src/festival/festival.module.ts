import { Module } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { FestivalRepository } from './festival.repository';
import { FestivalController } from './festival.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/category.repository';
import { Festival } from './festival.entity';
import { Category } from 'src/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Festival, Category])],
  controllers: [FestivalController],
  providers: [FestivalService, FestivalRepository, CategoryRepository],
})
export class FestivalModule {}
