import { Controller, Get, Query } from '@nestjs/common';
import { PlannerService } from './planner.service';
import { generatePlanner } from './dto/planner.dto';

@Controller('planner')
export class PlannerController {
  constructor(private plannerService: PlannerService) {}

  @Get('/generate')
  generatePlanner(@Query() generatePlanner: generatePlanner) {
    return this.plannerService.generatePlanner(generatePlanner);
  }
}
