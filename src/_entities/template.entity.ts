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
import { TemplateCategoryEntity } from './template-category.entity';

@Entity('template')
export class TemplateEntity extends BaseEntity {
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

  @ManyToOne(() => UserEntity, (user) => user.template, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(
    () => TemplateCategoryEntity,
    (templateCategory) => templateCategory.template,
  )
  templateCategory: TemplateCategoryEntity[];
}
