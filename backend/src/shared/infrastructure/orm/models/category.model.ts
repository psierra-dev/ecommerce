'use strict';
import {Table, Column, Model, DataType, AutoIncrement, PrimaryKey, AllowNull, Unique, HasMany, CreatedAt, UpdatedAt} from 'sequelize-typescript';
import Product from './product.model';

@Table
export default class Category extends Model<Category> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;

  @HasMany(() => Product)
  products: Product[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}