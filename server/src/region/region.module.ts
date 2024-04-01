import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { RegionRepository } from './region.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [TypeOrmModule.forFeature([RegionRepository])],
  controllers: [RegionController],
  providers: [RegionService, RegionRepository],
})
export class RegionModule {}
