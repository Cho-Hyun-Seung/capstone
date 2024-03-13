import { Controller, Post, Get, Param, Query } from '@nestjs/common';
import { RegionService } from './region.service';
import { Region } from './region.entity';

@Controller('region')
export class RegionController {
  constructor(private regionService: RegionService) {}

  @Get('/rootregions')
  getRootRegion(): Promise<Region[]> {
    return this.regionService.getRootRegion();
  }

  @Get('/childregions')
  getChildRegion(@Query('regionName') regionName: string): Promise<Region[]> {
    return this.regionService.getChildRegion(regionName);
  }

  @Post('/createbyfile')
  createByFile(): Promise<void> {
    return this.regionService.createByFile();
  }
}
