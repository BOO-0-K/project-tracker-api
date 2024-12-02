import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('todo')
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @Column()
  userId: number;

  @Column({
    type: 'varchar',
    length: 10,
  })
  status: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 1000,
  })
  memo: string;

  @Column({
    nullable: true,
    type: 'date',
  })
  today: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.todo, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;
}
