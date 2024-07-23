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
import axios from 'axios';

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
  async getByCoord(getByCoordDto: getByCoordDto, retries = 0) {
    //! 여기서 update 할 경우 기존 touristSpots 값을 가져와서 사용하기
    //! 거리 순으로 정렬된 값을 선호도 순으로 정렬하기
    //! 리스트 페이지에서 즐겨찾기 추가하기
    //----------- 해당 관광지의 즐겨찾기값이 DB에 존재하지 않는 경우 여기서 해결해주기 --------------
    /*
    {
      'contentId': '2342432', // string
      'zzim': 432 // number
      '트렌드' => 네이버 데이터 랩에 1번 노드를 기준으로 period 값을 분석
                => 분석된 period 값을 정형화하여 각 관광지에 trend: 52 형태로 저장함
    }
     */
    //
    let { lodgingX, lodgingY, category_code, distance, festival } =
      getByCoordDto;
    const MAX_RETRIES = 3;
    // 선택된 관광지 목록 6개
    let resTouristSpots = [];
    // 3차원 배열로 나뉜 관광지
    const resultArray = [];
    let category_codes = category_code
      .split(',')
      .filter((code) => code.trim() !== '');
    console.log(category_code);
    const lodging = {
      title: '시작점',
      mapx: lodgingX,
      mapy: lodgingY,
    };
    try {
      const response = await axios.get(
        `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${process.env.SERVICE_KEY}&numOfRows=1000&pageNo=1&MobileOS=AND&MobileApp=FestivalBoard&_type=json&listYN=Y&arrange=E&mapX=${lodgingX}&mapY=${lodgingY}&radius=${distance}&contentTypeId=12`,
      );

      let touristSpots = response.data.response.body.items.item;
      console.log(touristSpots);
      if (touristSpots == undefined || touristSpots.length < 6) {
        retries = 3;
        throw Error('관광지가 너무 적습니다!');
      }
      // 카테고리 선택사항 우선으로 넣기
      if (category_codes.length !== 0) {
        touristSpots = touristSpots.filter((touristSpot) => {
          const target = category_codes.some((code) => {
            return touristSpot.cat3.includes(code);
          });
          if (target && resTouristSpots.length < 6) {
            resTouristSpots.push(touristSpot);
          }
          return !target || resTouristSpots.length >= 6;
        });
      }

      if (resTouristSpots.length < 6) {
        const inputLength = 6 - resTouristSpots.length;
        console.log(inputLength);
        for (let i = 0; i < inputLength; i++) {
          const randomNum = Math.floor(Math.random() * touristSpots.length);
          resTouristSpots.push(touristSpots[randomNum]);
          touristSpots.splice(randomNum, 1);
        }
      }
      // 조합 생성하기
      const combination = (index, depth, arr) => {
        //
        if (depth == 0) {
          resultArray.push([...arr]);
          return;
        }
        for (let i = index; i < resTouristSpots.length; i++) {
          arr.push(resTouristSpots[i]);
          combination(i + 1, depth - 1, arr);
          arr.pop();
        }
      };

      // 중복 요소 있는지 확인용
      const checkCommon = (arr1, arr2): boolean => {
        const set = new Set(arr1);
        for (const element of arr2) {
          if (set.has(element)) {
            return true;
          }
        }
        return false;
      };

      const createNonOverlappingPairs = (combinations) => {
        const pairs = [];
        const updatedResTouristSpots = [lodging, ...resTouristSpots];

        const getIndices = (dateArray) => {
          return dateArray.map((v) =>
            updatedResTouristSpots.findIndex(
              (touristSpot) => v.title === touristSpot.title,
            ),
          );
        };

        for (let i = 0; i < combinations.length; i++) {
          for (let j = i + 1; j < combinations.length; j++) {
            if (!checkCommon(combinations[i], combinations[j])) {
              const firstDate = [
                JSON.parse(JSON.stringify(lodging)),
                ...JSON.parse(JSON.stringify(combinations[i])),
              ];
              const secondDate = [
                JSON.parse(JSON.stringify(lodging)),
                ...JSON.parse(JSON.stringify(combinations[j])),
              ];
              console.log(updatedResTouristSpots.map((v) => v.dist));

              const firstDateIdx: number[] = getIndices(firstDate);
              const secondDateIdx: number[] = getIndices(secondDate);

              const filterDist = (date, index) => {
                date.forEach((v) => {
                  v.dist = index.map((k) => v.dist[k]);
                });
              };

              filterDist(firstDate, firstDateIdx);
              filterDist(secondDate, secondDateIdx);

              pairs.push([firstDate, secondDate]);
            }
          }
        }
        return pairs;
      };

      // 거리 계산하기
      const coordToRadian = (coord) => {
        return (coord * Math.PI) / 180;
      };

      const haversine = (lat1, lat2, lng1, lng2) => {
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
        // m단위로 변경
        return btwDistance * 1000;
      };
      // m 단위로 결과가 나옴
      resTouristSpots.unshift(lodging);
      resTouristSpots.map((touristSpot) => {
        const cal_harversine = resTouristSpots.map((v) => {
          return haversine(v.mapy, touristSpot.mapy, v.mapx, touristSpot.mapx);
        });
        touristSpot['dist'] = cal_harversine;
        return cal_harversine;
      });
      await resTouristSpots.shift();

      // 조합 생성하기
      combination(0, 3, []);
      const result = await createNonOverlappingPairs(resultArray);
      console.log(result.length);
      return result;

      // 카테고리에 있는거 우선으로 넣고 아닌경우 추가로 넣기
    } catch (err) {
      console.log(`위치기반 조회 오류`, err);
      if (retries < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log(`위치기반 조회 재시도 중... (재시도 횟수: ${retries + 1})`);
        return await this.getByCoord(getByCoordDto, retries + 1);
      } else {
        throw Error(`위치기반 조회 최대 재시도 횟수(${MAX_RETRIES}) 초과`);
      }
    }
  }
}
