import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/createcategory')
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Post('/createbyfile')
  insertAllCategory(): Promise<void> {
    return this.categoryService.createCategoryByFile();
  }

  @Get('/getbycode/:code')
  getCategoryByCode(@Param('code') code: string): Promise<Category> {
    return this.categoryService.getCategoryByCode(code);
  }

  @Get('/root')
  getRootCategory(): Promise<Category[]> {
    return this.categoryService.getRootCategory();
  }

  @Get('/depth2')
  getDepth2Category(): Promise<Category[]> {
    return this.categoryService.getDepth2Category();
  }

  @Get('/getdescendants/:code')
  getDescendantCategory(@Param('code') code: string): Promise<Category[]> {
    return this.categoryService.getDescendantCateogry(code);
  }
}
