import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Festival extends BaseEntity {
  @PrimaryGeneratedColumn()
  festival_id: number;

  @Column()
  title: string;

  @Column({
    nullable: false,
  })
  content_id: number;

  @Column()
  content_type_id: number;

  @Column({
    nullable: true,
  })
  address1: string;

  @Column({
    nullable: true,
  })
  address2: string;

  @Column('boolean', { default: () => false })
  booktour: boolean;

  @Column()
  event_start_date: Date;

  @Column({
    nullable: true,
  })
  event_end_date: Date;

  @Column({
    nullable: true,
  })
  first_image: string;

  @Column({
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
  homepage: string;

  @Column('text', {
    nullable: true,
  })
  charge: string;

  @Column({
    nullable: true,
  })
  discount_info: string;

  @Column('text', {
    nullable: true,
  })
  age_limit: string;

  @Column()
  category: string;

  @Column('text', {
    nullable: true,
  })
  overview: string;
}
