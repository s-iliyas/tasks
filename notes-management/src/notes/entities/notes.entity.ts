import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';

@Entity()
export class Notes extends BaseEntity {
  @Column()
  title: string;

  @Column()
  body: string;
}
