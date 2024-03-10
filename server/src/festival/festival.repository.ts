import { Injectable, NotFoundException } from '@nestjs/common';
import { Festival } from './festival.entity';
import {
  DataSource,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';

@Injectable()
export class FestivalRepository extends Repository<Festival> {
  constructor(private dataSouce: DataSource) {
    super(Festival, dataSouce.createEntityManager());
  }

  // 모든 축제 정보를 가져오는 API
  async getAllFestivals(): Promise<Festival[]> {
    const festivals: Festival[] = await this.find();

    if (festivals.length == 0) {
      throw new NotFoundException("Can't find festival");
    }

    return festivals;
  }

  // 날짜 범위로 축제 정보를 가져오는 API
  async getFestivalByDate(startDate: Date, endDate: Date): Promise<Festival[]> {
    const festivals: Festival[] = await this.find({
      where: {
        event_start_date: LessThan(endDate),
        event_end_date: MoreThan(startDate),
      },
    });

    if (festivals.length == 0) {
      throw new NotFoundException(
        `${startDate} ~ ${endDate}에 해당 축제가 존재하지 않습니다.`,
      );
    }

    return festivals;
  }

  // 페이지 번호로 축제 정보를 가져오는 API
  // 오늘 날짜와 가장 가까운 축제 정보를 우선으로 가져옴
  async getFestivalByRange(
    pageNum: number,
    pageSize: number,
  ): Promise<Festival[]> {
    // 오늘 날짜를 계산함
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const today = `${year}-${month}-${day}`;
    // 축제 정보를 가져오는 쿼리
    //  1. 제목, 시작일, 종료일, 위치를 가져옴
    //  2. 종료일이 오늘보다 큰 경우만 가져옴
    //  3. 시작일 오름차순으로 정렬함
    //  4. 페이지에 보여질 항목 개수, 페이지 번호를 활용하여 전송할 축제를 결정함

    //! 부모의 카테고리 A0207을 가지는 경우만 가져와야함!
    const festivals: Festival[] = await this.createQueryBuilder()
      // .select(['title', 'event_start_date', 'event_end_date', 'address1'])
      .where({
        event_end_date: MoreThan(today),
      })
      .orderBy({ 'festival.event_start_date': 'ASC' })
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getMany();

    console.log(today, festivals);
    if (festivals.length === 0) {
      throw new NotFoundException(`더이상 축제 정보가 존재하지 않습니다.`);
    }
    return festivals;
  }
}
