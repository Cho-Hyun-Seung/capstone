import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Planner extends BaseEntity {
  @PrimaryGeneratedColumn()
  planner_id: number;

  @Column()
  plannner_name: string;
}
