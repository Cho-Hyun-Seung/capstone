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
  @PrimaryColumn()
  region: string;

  @ManyToOne((type) => Region, (region) => region.children)
  parent: Region;

  @OneToMany((type) => Region, (region) => region.parent)
  children: Region[];
}
