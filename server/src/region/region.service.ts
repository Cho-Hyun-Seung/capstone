import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionRepository } from './region.repository';
import { Region } from './region.entity';

@Injectable()
export class RegionService {
  constructor(private regionRepository: RegionRepository) {}

  async getRootRegion(): Promise<Region[]> {
    return await this.regionRepository.getRootRegion();
  }

  async createByFile(): Promise<void> {
    return await this.regionRepository.createByFile();
  }

  async getChildRegion(regionName: string): Promise<Region[]> {
    return await this.regionRepository.getChildrenRegion(regionName);
  }
}
