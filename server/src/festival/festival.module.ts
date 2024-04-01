import { Module } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { FestivalRepository } from './festival.repository';
import { FestivalController } from './festival.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/category.repository';

@Module({
  // imports: [TypeOrmModule.forFeature([FestivalRepository, CategoryRepository])],
  controllers: [FestivalController],
  providers: [FestivalService, FestivalRepository, CategoryRepository],
})
export class FestivalModule {}
