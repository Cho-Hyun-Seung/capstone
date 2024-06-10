import { Injectable } from '@nestjs/common';
import { FestivalRepository } from 'src/festival/festival.repository';
import { TouristSpotRepository } from 'src/touristSpot/touristSpot.repository';
import { PlannerRepository } from './planner.repository';
import { generatePlanner } from './dto/planner.dto';
export interface TSPResult {
  length: number;
  path: any[];
}

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
      return await this.TSPAlgorithms(generatePlanner);
    } else {
      // this.dijkstraAlgoritms({ category_code, distance });
    }
  }

  async TSPAlgorithms(data: any) {
    try {
      const touristSpotArr = await this.touristSpotRepository.getByCoord(data);
      const n = touristSpotArr[0].length;
      let firstDayResult: TSPResult = {
        length: Number.MAX_SAFE_INTEGER,
        path: [],
      };
      let secondDayResult: TSPResult = {
        length: Number.MAX_SAFE_INTEGER,
        path: [],
      };
      let pick = [];

      touristSpotArr.forEach((combinations: any[]) => {
        const firstDay = combinations[0];
        const firstDayDistances = [];
        const secondDay = combinations[1];
        const secondDayDistances = [];
        firstDay.forEach((spots) => {
          firstDayDistances.push(spots.dist);
        });

        secondDay.forEach((spots) => {
          secondDayDistances.push(spots.dist);
        });
        const result1 = tspWithPath(firstDayDistances);
        const result2 = tspWithPath(secondDayDistances);
        const resultLength = result1.length + result2.length;
        if (resultLength < firstDayResult.length + secondDayResult.length) {
          pick = combinations;
          firstDayResult = result1;
          secondDayResult = result2;
        }
      });

      function tspWithPath(distances: number[][]): TSPResult {
        const memo: Map<string, TSPResult> = new Map();

        function generateKey(visited: number[], last: number): string {
          visited.sort((a, b) => a - b);
          return `${visited.join(',')}-${last}`;
        }

        function tspHelper(visited: number[], last: number): TSPResult {
          if (visited.length === distances.length) {
            return { length: distances[last][0], path: [last, 0] };
          }

          const key = generateKey(visited, last);
          if (memo.has(key)) {
            return memo.get(key)!;
          }

          let shortestPath: TSPResult = { length: Infinity, path: [] };
          for (let next = 0; next < distances.length; next++) {
            if (!visited.includes(next)) {
              const newVisited = [...visited, next];
              const result = tspHelper(newVisited, next);
              const distance = distances[last][next] + result.length;
              if (distance < shortestPath.length) {
                shortestPath = {
                  length: distance,
                  path: [last, ...result.path],
                };
              }
            }
          }

          memo.set(key, shortestPath);
          return shortestPath;
        }

        return tspHelper([0], 0);
      }
      // console.log(firstDayResult, secondDayResult);
      const firstDayText = firstDayResult.path
        .map((v) => {
          return pick[0][v].title;
        })
        .join(' => ');

      const secondDayText = secondDayResult.path
        .map((v) => {
          return pick[1][v].title;
        })
        .join(' => ');
      return { firstDayText, secondDayText, firstDayResult, secondDayResult };
    } catch (error) {
      console.error('Error in TSPAlgorithms:', error);
      throw error; // 예외를 다시 throw하여 호출자에게 전달
    }
  }

  // async dijkstraAlgoritms(data) {
  //   let { lodgingX, lodgingY, category_code, _, festival } = data;
  //   const { touristSpots, distances } =
  //     await this.touristSpotRepository.getByCoord(data);
  //   const saveResult: Map<string, { cost: number; path: number[] }> = new Map();
  //   const n = touristSpots.length;
  //   // 노드 방문 여부 확인
  //   const visited = Array(n).fill(false);

  //   // 최단 경로 기록
  //   const minPath = visited.map((_, i) => {
  //     distances[0][i];
  //   });

  //   const dijkstra = (graph, visited, path, dist, minPath) => {
  //     // 1번 노드 방문
  //     visited[0] = true;
  //     path[0][0] = graph[0][0];
  //     // 1번 노드에서 이동할 수 있는 노드 중 가장 가까운 B 노드 선택

  //     // 2. 이동 거리 저장

  //     // 3.
  //   };
  // }
}
