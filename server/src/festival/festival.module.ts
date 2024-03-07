import { Module } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { FestivalRepository } from './festival.repository';
import { FestivalController } from './festival.controller';

@Module({
  controllers: [FestivalController],
  providers: [FestivalService, FestivalRepository],
})
export class FestivalModule {}
