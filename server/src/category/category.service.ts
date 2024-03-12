import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/category.dto';
import { Category } from './category.entity';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  // 카테고리 입력을 통해 카테고리 생성하기
  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.createCategory(createCategoryDto);
  }

  // 카테고리 리스트를 활용하여 카테고리 생성하기
  async createCategoryByFile(): Promise<void> {
    return await this.categoryRepository.createCategoryByFile();
  }

  async getCategoryByCode(code: string): Promise<Category> {
    return await this.categoryRepository.getCategoryByCode(code);
  }

  // 루트 카테고리 가져오기
  async getRootCategory(): Promise<Category[]> {
    return await this.categoryRepository.getRootCategory();
  }

  // depth2 카테고리 가져오기
  async getDepth2Category(): Promise<Category[]> {
    return await this.categoryRepository.getDepth2Category();
  }

  async getDescendantCateogry(code: string): Promise<Category[]> {
    return await this.categoryRepository.getDescendantsCategory(code);
  }
}
