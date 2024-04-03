import { Injectable, NotFoundException } from '@nestjs/common';
import { Festival } from './festival.entity';
import { DataSource, In, LessThan, Like, MoreThan, Repository } from 'typeorm';
import { Category } from 'src/category/category.entity';
import { getFestivalDto } from './dto/festival..dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FestivalRepository extends Repository<Festival> {
  constructor(
    @InjectRepository(Festival)
    private festivalRepository: Repository<Festival>,
  ) {
    super(
      festivalRepository.target,
      festivalRepository.manager,
      festivalRepository.queryRunner,
    );
  }

  // 모든 축제 정보를 가져오는 API
  async getAllFestivals(): Promise<Festival[]> {
    const festivals: Festival[] = await this.festivalRepository.find();

    if (festivals.length == 0) {
      throw new NotFoundException("Can't find festival");
    }

    return festivals;
  }

  // 날짜 범위로 축제 정보를 가져오는 API
  async getFestivalByDate(startDate: Date, endDate: Date): Promise<Festival[]> {
    const festivals: Festival[] = await this.festivalRepository.find({
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
    getFestivalDto: getFestivalDto,
    festivalCategory: Category[],
  ): Promise<Festival[]> {
    const { pageNum, pageSize, region } = getFestivalDto;
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
    const festivalCategoryCodes: string[] = festivalCategory.map(
      (v) => v.category_code,
    );
    const festivals: Festival[] = await this.festivalRepository
      .createQueryBuilder()
      .where({
        event_end_date: MoreThan(today),
        category: In([...festivalCategoryCodes]),
        address1: Like(`%${region}%`),
      })
      .orderBy({ 'festival.event_start_date': 'ASC' })
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getMany();

    if (festivals.length === 0) {
      throw new NotFoundException(`더이상 축제 정보가 존재하지 않습니다.`);
    }
    return festivals;
  }
}
