import { Controller } from '@nestjs/common';
import { FestivalService } from './festival.service';

@Controller('festival')
export class FestivalController {
  constructor(private festivalService: FestivalService) {}
}
