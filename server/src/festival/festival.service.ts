import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FestivalRepository } from './festival.repository';

@Injectable()
export class FestivalService {
  constructor(
    @InjectRepository(FestivalRepository)
    private festivalRepository: FestivalRepository,
  ) {}
}
