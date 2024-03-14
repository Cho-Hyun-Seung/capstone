import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  region: string;

  @ManyToOne((type) => Region, (region) => region.children)
  parent: Region;

  @OneToMany((type) => Region, (region) => region.parent)
  children: Region[];
}
