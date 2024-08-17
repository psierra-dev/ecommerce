'use strict';
import {Table, Column, Model, DataType, PrimaryKey, AllowNull, CreatedAt, UpdatedAt, Default, ForeignKey, BelongsTo} from 'sequelize-typescript';
import Order from './order.model';

@Table
export default class Payment extends Model<Payment> {

  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.FLOAT)
  amount: number;

  @AllowNull(false)
  @Default('pending')
  @Column(DataType.ENUM("pending" , "approved" , "cancelled"))
  status: "pending" | "approved" | "cancelled";

  
  @Column(DataType.ENUM('cash', 'card'))
  payment_method: 'cash' | 'card';

  @ForeignKey(() => Order)
  @Column
  order_id: string;

  @BelongsTo(() => Order)
  order: Order

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}