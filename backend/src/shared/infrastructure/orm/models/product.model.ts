'use strict';
import {Table, Column, Model, DataType, AutoIncrement, PrimaryKey, AllowNull, Unique, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import Category from './category.model';
import OrderItem from './orderitem.model';

@Table
export default class Product extends Model<Product> {
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

  @Column(DataType.STRING)
  brand: string;

  @Column(DataType.FLOAT)
  price: number;

  @Column(DataType.FLOAT)
  discount: number;

  @Column(DataType.INTEGER)
  stock: number;

  @Column(DataType.STRING)
  material: string;

  @Column(DataType.STRING)
  technology: string;

  @ForeignKey(() => Category)
  @Column
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => OrderItem)
  order_items: OrderItem[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}