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
    for (let region of regions) {
      const doData = Object.keys(region)[0];
      let doInfo = await this.findOneBy({ region: doData });
      if (!doInfo) {
        doInfo = this.create({ region: doData });
        await this.save(doInfo);
      }

      for (let sigungu of region[doData]) {
        // 이미 존재하는 경우 skip
        const existRegion = await this.findOne({
          where: { region: sigungu, parent: doInfo },
        });

        if (!existRegion) {
          const sigunguInfo = this.create({
            region: sigungu,
            parent: doInfo,
          });
          await this.save(sigunguInfo);
        }
      }
    }
  }
}
