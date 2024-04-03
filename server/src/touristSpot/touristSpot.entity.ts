import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeLevelColumn,
  TreeParent,
} from 'typeorm';

@Entity()
export class TouristSpot extends BaseEntity {
  @PrimaryGeneratedColumn()
  tourist_spot_id: number;

  @Column({
    nullable: false,
  })
  category_code: string;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  content_id: number;

  @Column({
    nullable: false,
  })
  content_type_id: number;

  @Column('text', {
    nullable: false,
  })
  address1: string;

  @Column({
    nullable: true,
  })
  address2: string;

  @Column('boolean', { default: () => false })
  booktour: boolean;

  @Column('boolean', { default: () => false })
  culture_heritage: boolean;

  @Column('boolean', { default: () => false })
  natural_heritage: boolean;

  @Column('boolean', { default: () => false })
  memory_heritage: boolean;

  @Column({
    nullable: true,
  })
  open_date: string;

  @Column('text', {
    nullable: true,
  })
  rest_date: string;

  @Column('text', {
    nullable: true,
  })
  age_limit: string;

  @Column('text', {
    nullable: true,
  })
  first_image: string;

  @Column('text', {
    nullable: true,
  })
  first_image2: string;

  @Column({
    nullable: true,
  })
  tel: string;

  // 126.9769930325
  @Column('decimal', {
    precision: 13,
    scale: 10,
    nullable: false,
  })
  nx: number;

  // 37.5788222356
  @Column('decimal', {
    precision: 13,
    scale: 10,
    nullable: false,
  })
  ny: number;

  @Column('text', {
    nullable: true,
  })
  overview: string;
}
