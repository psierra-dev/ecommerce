'use strict';
import {Table, Column, Model, DataType, AutoIncrement, PrimaryKey, AllowNull,  CreatedAt, UpdatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import Order from './order.model';
import Product from './product.model';

@Table
export default class OrderItem extends Model<OrderItem> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.FLOAT)
  price: number;

  @ForeignKey(() => Order)
  @Column
  order_id: string;

  @BelongsTo(() => Order)
  order: Order

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  product_id: number;

  @BelongsTo(() => Product)
  product: Product

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}