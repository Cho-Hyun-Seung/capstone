import { Injectable } from '@nestjs/common';
import { FestivalRepository } from 'src/festival/festival.repository';
import { TouristSpotRepository } from 'src/touristSpot/touristSpot.repository';
import { PlannerRepository } from './planner.repository';
import { generatePlanner } from './dto/planner.dto';

@Injectable()
export class PlannerService {
  constructor(
    private touristSpotRepository: TouristSpotRepository,
    private festivalRepository: FestivalRepository,
    private plannerRepository: PlannerRepository,
  ) {}

  async generatePlanner(generatePlanner: generatePlanner) {
    let { lodgingX, lodgingY, category_code, distance, festival } =
      generatePlanner;

    //! 축제 정보도 가져와야함!!

    // 숙소 좌표가 존재하는 경우와 존재하지 않는 경우를 나눔
    if (lodgingX !== null && lodgingY !== null) {
      console.log('startTSP');
      return this.TSPAlgorithms(generatePlanner);
    } else {
      this.dijkstraAlgoritms({ category_code, distance });
    }
  }

  async TSPAlgorithms(data) {
    let { lodgingX, lodgingY, category_code, distance, festival } = data;
    const { touristSpots, distances } =
      await this.touristSpotRepository.getByCoord(data);
    const saveResult: Map<string, { cost: number; path: number[] }> = new Map();
    const n = distances.length;

    const dp = (
      visited: number,
      here: number,
    ): { cost: number; path: number[] } => {
      const key = `${visited}-${here}`;
      // 방문이 계산된 경우
      if (saveResult.has(key)) {
        return saveResult.get(key)!;
      }

      // 모든 지점을 방문한 경우
      if (visited === (1 << n) - 1) {
        return { cost: distances[here][0], path: [here, 0] };
      }

      let minCost = Number.POSITIVE_INFINITY;
      let minPath: number[] = [];

      for (let spot = 0; spot < n; spot++) {
        if ((visited & (1 << spot)) === 0) {
          const newVisit = visited | (1 << spot); // 현재 지점에 방문 표시
          const { cost, path } = dp(newVisit, spot);
          const totalCost = distances[here][spot] + cost;
          // 최적 경로 갱신
          console.log(visited);
          if (totalCost < minCost) {
            minCost = totalCost;
            minPath = [here, ...path];
          }
        }
        saveResult.set(key, { cost: minCost, path: minPath }); // 현재 상태의 최소비용 map에 저장
      }
      return { cost: minCost, path: minPath };
    };
    const { cost, path } = dp(1, 0);
    console.log(path, cost);
    return path.map((i) => touristSpots[i].title).join(' -> ');
  }

  async dijkstraAlgoritms(data) {}
}
