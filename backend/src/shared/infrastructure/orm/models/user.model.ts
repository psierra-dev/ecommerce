'use strict';
import {Table, Column, Model, DataType, PrimaryKey, AllowNull, Unique, CreatedAt, UpdatedAt, Default, HasMany} from 'sequelize-typescript';
import Order from './order.model';

@Table
export default class User extends Model<User> {

  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  name: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  address: string;

  @Column(DataType.STRING)
  phone_number: string;

  @Default('client')
  @Column(DataType.STRING)
  role: 'admin' | 'client';

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @HasMany(() => Order)
  orders: Order[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}