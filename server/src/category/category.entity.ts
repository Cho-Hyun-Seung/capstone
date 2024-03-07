import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  Tree,
  TreeChildren,
  TreeLevelColumn,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Category extends BaseEntity {
  @PrimaryColumn()
  category_code: string;

  @Column()
  category_name: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  //   @TreeLevelColumn()
  //   level: number;
}
