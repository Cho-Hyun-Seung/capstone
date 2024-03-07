import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/category.dto';
import { categories } from './category.list';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSouce: DataSource) {
    super(Category, dataSouce.createEntityManager());
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { category_code, category_name } = createCategoryDto;
    const category = this.create({
      category_code,
      category_name,
    });
    await this.save(category);

    return category;
  }

  async insertCategory() {
    const categoryArr: CreateCategoryDto[] = categories;
    for (let category of categoryArr) {
      const resultCategory = new Category();
      resultCategory.category_code = category.category_code;
      resultCategory.category_name = category.category_name;
      if (category.category_code.length === 3) {
        resultCategory.parent = await this.findOneBy({
          category_code: category.category_code,
        });
      }

      if (category.category_code.length === 5) {
        resultCategory.parent = await this.findOneBy({
          category_code: category.category_code.substring(0, 3),
        });
      }

      if (category.category_code.length === 9) {
        resultCategory.parent = await this.findOneBy({
          category_code: category.category_code.substring(0, 5),
        });
      }
      console.log(resultCategory);

      await this.dataSouce.manager.save(resultCategory);
    }
  }

  async getRootCategory() {
    return await this.dataSouce.manager.getTreeRepository(Category).findRoots();
  }
}
