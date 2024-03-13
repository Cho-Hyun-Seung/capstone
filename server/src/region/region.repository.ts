import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { Region } from './region.entity';
import { regions } from './region.list';

@Injectable()
export class RegionRepository extends Repository<Region> {
  constructor(private dataSource: DataSource) {
    super(Region, dataSource.createEntityManager());
  }

  async getRootRegion(): Promise<Region[]> {
    return await this.find({
      where: {
        parent: IsNull(),
      },
    });
  }

  async getChildrenRegion(regionName: string): Promise<Region[]> {
    const parentRegion = await this.findOneBy({ region: regionName });
    console.log(parentRegion, regionName);
    const childerenRegion = await this.find({
      where: {
        parent: parentRegion,
      },
    });

    return childerenRegion;
  }

  async createByFile() {
    const doInfo = new Region();
    const sigunguInfo = new Region();
    for (let region of regions) {
      const doData = Object.keys(region)[0];
      doInfo.region = doData;
      await this.save(doInfo);
      for (let sigungu of region[doData]) {
        sigunguInfo.region = sigungu;
        sigunguInfo.parent = doInfo;
        console.log(sigunguInfo);
        await this.save(sigunguInfo);
      }
    }
  }
}
