import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TodoEntity } from './todo.entity';
import { TemplateCategoryEntity } from './template-category.entity';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.category, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(() => TemplateCategoryEntity, (templateCategory) => templateCategory.category)
  templateCategory: TemplateCategoryEntity[];

  @OneToMany(() => TodoEntity, (todo) => todo.category)
  todo: TodoEntity[];
}
