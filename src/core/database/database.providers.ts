import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/entities/user.entity';
import { Post } from '../../modules/posts/post.entity';


export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }

      const sequelize = new Sequelize(
        'df7agiv9jbp9hc',
        'sdwsmloermsari',
        '685af9d4f9614e9ae6dcb4f9c99a82b6e1910d84a15d4a8ec471ca4bacc16a2b',
        {
          dialect: 'postgres',
          protocol: 'postgres',
          host: process.env.DB_HOST,
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false, // very important
            },
          },
        },
      );

      sequelize.addModels([
        User,
        Post,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
