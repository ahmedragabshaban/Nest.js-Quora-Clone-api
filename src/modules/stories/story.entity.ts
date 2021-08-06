import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from '../users/entities/user.entity';

@Table
export class Story extends Model<Story> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  status: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  votes: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
