import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { Region } from './region.entity';
import { regions } from './region.list';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegionRepository extends Repository<Region> {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {
    super(
      regionRepository.target,
      regionRepository.manager,
      regionRepository.queryRunner,
    );
  }

  async getRootRegion(): Promise<Region[]> {
    return await this.regionRepository.find({
      where: {
        parent: IsNull(),
      },
    });
  }

  async getChildrenRegion(regionName: string): Promise<Region[]> {
    const parentRegion = await this.regionRepository.findOneBy({
      region: regionName,
    });
    console.log(parentRegion, regionName);
    const childerenRegion = await this.regionRepository.find({
      where: {
        parent: parentRegion,
      },
    });

    return childerenRegion;
  }

  async createByFile() {
    for (let region of regions) {
      const doData = Object.keys(region)[0];
      let doInfo = await this.regionRepository.findOneBy({ region: doData });
      if (!doInfo) {
        doInfo = this.regionRepository.create({ region: doData });
        await this.regionRepository.save(doInfo);
      }

      for (let sigungu of region[doData]) {
        // 이미 존재하는 경우 skip
        const existRegion = await this.regionRepository.findOne({
          where: { region: sigungu, parent: doInfo },
        });

        if (!existRegion) {
          const sigunguInfo = this.regionRepository.create({
            region: sigungu,
            parent: doInfo,
          });
          await this.regionRepository.save(sigunguInfo);
        }
      }
    }
  }
}
