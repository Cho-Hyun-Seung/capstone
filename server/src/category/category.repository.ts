import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/category.dto';
import { categories } from './category.list';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super(
      categoryRepository.target,
      categoryRepository.manager,
      categoryRepository.queryRunner,
    );
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { category_code, category_name } = createCategoryDto;
    const category = this.categoryRepository.create({
      category_code,
      category_name,
    });
    await this.categoryRepository.save(category);

    return category;
  }

  async createCategoryByFile() {
    const categoryArr: CreateCategoryDto[] = categories;
    for (let category of categoryArr) {
      const resultCategory = new Category();
      resultCategory.category_code = category.category_code;
      resultCategory.category_name = category.category_name;
      if (category.category_code.length === 3) {
        resultCategory.parent = await this.categoryRepository.findOneBy({
          category_code: category.category_code,
        });
      }

      if (category.category_code.length === 5) {
        resultCategory.parent = await this.categoryRepository.findOneBy({
          category_code: category.category_code.substring(0, 3),
        });
      }

      if (category.category_code.length === 9) {
        resultCategory.parent = await this.categoryRepository.findOneBy({
          category_code: category.category_code.substring(0, 5),
        });
      }
      console.log(resultCategory);

      await this.categoryRepository.save(resultCategory);
    }
  }

  async getCategoryByCode(code: string): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: {
        category_code: code,
      },
    });
  }

  async getRootCategory(): Promise<Category[]> {
    return await this.categoryRepository.manager
      .getTreeRepository(Category)
      .findRoots();
  }

  async getDepth2Category(): Promise<Category[]> {
    return await this.categoryRepository.manager
      .getTreeRepository(Category)
      .findTrees({ depth: 2 });
  }

  async getDescendantsCategory(parentCode: string): Promise<Category[]> {
    const parentCategory = await this.getCategoryByCode(parentCode);
    const descendatsCategory: Category[] = await this.categoryRepository.manager
      .getTreeRepository(Category)
      .findDescendantsTree(parentCategory, { depth: 2 })
      .then((v) => v.children);

    // console.log(descendatsCategory[0].children);

    //.getTreeRepository(Category)
    // .findDescendantsTree(parentCategory);

    // 자손 카테고리 배열에서 루트 카테고리의 인덱스 값
    // const index = descendatsCategory.findIndex(
    //   (category) => category.category_code === parentCategory.category_code,
    // );
    // 부모 카테고리를 제거하고 리턴함
    // descendatsCategory.splice(index, 1);
    return descendatsCategory;
  }
}
