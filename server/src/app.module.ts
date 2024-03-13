import { Module } from '@nestjs/common';
import { FestivalModule } from './festival/festival.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegionModule } from './region/region.module';
@Module({
  imports: [
    FestivalModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeORMConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Category]),
    CategoryModule,
    RegionModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      ignoreEnvFile: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
