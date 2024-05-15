import { Module } from '@nestjs/common';
import { FestivalModule } from './festival/festival.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegionModule } from './region/region.module';
import { TouristSpotModule } from './touristSpot/touristSpot.module';
import { AuthModule } from './auth/auth.module';
import { PlannerController } from './planner/planner.controller';
import { PlannerModule } from './planner/planner.module';
@Module({
  imports: [
    FestivalModule,
    TouristSpotModule,
    // PlannerModule,
    AuthModule,
    CategoryModule,
    RegionModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeORMConfig,
      inject: [ConfigService],
    }),
    // TypeOrmModule.forFeature([Category]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      ignoreEnvFile: false,
    }),
  ],
  controllers: [PlannerController],
  providers: [],
})
export class AppModule {}
