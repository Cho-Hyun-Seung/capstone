import { Injectable, NotFoundException } from '@nestjs/common';
import {
  And,
  DataSource,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TouristSpot } from './touristSpot.entity';
import {
  countTouristSpotDto,
  getTouristSpotDto,
  getByCoordDto,
} from './dto/touristSpot.dto';

@Injectable()
export class TouristSpotRepository extends Repository<TouristSpot> {
  constructor(
    @InjectRepository(TouristSpot)
    private touristSpotRepository: Repository<TouristSpot>,
  ) {
    super(
      touristSpotRepository.target,
      touristSpotRepository.manager,
      touristSpotRepository.queryRunner,
    );
  }

  async getTouristSpot(
    getTouristSpotDto: getTouristSpotDto,
  ): Promise<TouristSpot[]> {
    let { regions, pageNum, pageSize, category_code } = getTouristSpotDto;
    category_code = category_code || [];
    const regionConditions =
      regions && regions.length > 0
        ? regions.map((regionItem) => {
            return { address1: Like(`%${regionItem}%`) };
          })
        : [];

    const touristSpots: TouristSpot[] = await this.touristSpotRepository
      .createQueryBuilder()
      .where((builder) => {
        if (category_code.length === 0) {
        } else {
          builder.where({ category_code: In(category_code) });
        }
      })
      .andWhere(regionConditions)
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getMany();

    if (touristSpots.length === 0) {
      throw new NotFoundException(`관광지 정보가 존재하지 않습니다.`);
    }
    return touristSpots;
  }

  async countAllTouristSpot(
    countFestivalDto: countTouristSpotDto,
  ): Promise<number> {
    let { regions, category_code } = countFestivalDto;
    regions = regions || [];
    category_code = category_code || [];

    const regionConditions = regions.map((regionItem) => {
      return { address1: Like(`%${regionItem}%`) };
    });

    const countFestival = await this.touristSpotRepository
      .createQueryBuilder()
      .where((builder) => {
        if (category_code.length === 0) {
        } else {
          builder.where({ category_code: In(category_code) });
        }
      })
      .andWhere(regionConditions)
      .getCount();
    console.log('countFestival', countFestival);
    return countFestival;
  }

  // 요소
  // 1. 좌표
  // 2. 선택한 카테고리
  // 3. 직선 거리
  // 기본 틀
  // 관광지 하루에 2~3개
  // 최소 1박 2일
  // 최대 3박 4일
  // 돌아오는 방식? TSP 알고리즘
  // 3일인 경우 숙소 2개 선택가능?
  async getByCoord(
    getByCoordDto: getByCoordDto,
  ): Promise<{ touristSpots: TouristSpot[]; distances: number[][] }> {
    let { lodgingX, lodgingY, category_code, distance } = getByCoordDto;
    lodgingX = +lodgingX;
    lodgingY = +lodgingY;

    const coordToRadian = (coord) => {
      return (coord * Math.PI) / 180;
    };

    // 하버사인 공식 ==> 두 좌표 사이의 거리 구하기
    // https://kayuse88.github.io/haversine/
    const haversine = (
      lat1: number,
      lat2: number,
      lng1: number,
      lng2: number,
    ): number => {
      const lat1Rad = coordToRadian(lat1);
      const lat2Rad = coordToRadian(lat2);
      const lng1Rad = coordToRadian(lng1);
      const lng2Rad = coordToRadian(lng2);

      const deltaLat = lat2Rad - lat1Rad;
      const deltaLng = lng2Rad - lng1Rad;

      const sqrtNum =
        Math.sin(deltaLat / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLng / 2) ** 2;
      const btwDistance = 2 * 6371 * Math.asin(Math.sqrt(sqrtNum));

      return btwDistance;
    };

    // 위도(lat, y) 1° : 지구 반지름(6371) X 1° X 1라디안(파이/180) = 위도 1°당 거리
    // => 111.1949
    // 경도(lng, x) 1° : 지구 반지름(6371) X 1° X cos(라디안(위도 좌표)) = 경도 1° 당 거리
    const lat = 0.008993 * distance;
    const lng =
      (((1 / 6371) * 180) / Math.PI / Math.cos(coordToRadian(lodgingY))) *
      distance;

    // 가져올 때 네모모양으로 n km 자르고 시작하기
    // nx, ny가  + - n km인 사각형 안에 들어가는 요소들만 가져오기
    let touristSpots = await this.touristSpotRepository.findBy({
      nx: And(LessThanOrEqual(lodgingX + lng), MoreThanOrEqual(lodgingX - lng)),
      ny: And(LessThanOrEqual(lodgingY + lat), MoreThanOrEqual(lodgingY - lat)),
      // category_code: category_code
    });

    // 원 모양 내부에 존재하는 경우만
    touristSpots = touristSpots.filter((touristSpot) => {
      if (
        haversine(touristSpot.nx, lodgingX, touristSpot.ny, lodgingY) <=
        distance
      ) {
        return touristSpot;
      }
    });

    const distances = touristSpots.map((touristSpot) => {
      // 하버사인 공식을 모두 적용하기 위해서
      const cal_harversine = touristSpots.map((v) => {
        return haversine(v.nx, touristSpot.nx, v.ny, touristSpot.ny);
      });
      return cal_harversine;
    });

    const aroundTouristSpots = {
      touristSpots: touristSpots,
      distances: distances,
    };

    return aroundTouristSpots;
  }
}
