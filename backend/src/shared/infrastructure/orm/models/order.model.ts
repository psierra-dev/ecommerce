'use strict';
import {Table, Column, Model, DataType, PrimaryKey, AllowNull, CreatedAt, UpdatedAt, Default, ForeignKey, HasMany, HasOne} from 'sequelize-typescript';
import User from './user.model';
import OrderItem from './orderitem.model';
import Payment from './payment.model';

@Table
export default class Order extends Model<Order> {

  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.FLOAT)
  total_price: number;

  @AllowNull(false)
  @Default('pending')
  @Column(DataType.STRING)
  status: "pending" | "approved" | "cancelled";

  @ForeignKey(() => User)
  @Column
  user_id: string;

  @HasMany(() => OrderItem)
  order_items: OrderItem[];

  @HasOne(() => Payment)
  payment: Payment

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}