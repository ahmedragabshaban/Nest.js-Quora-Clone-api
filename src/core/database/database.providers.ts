import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/entities/user.entity';
import { Story } from '../../modules/stories/story.entity';
import { Votes } from '../../modules/stories/votes.entity';

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
        'dc1922ej4sfkep',
        'btzniqvnwflcmf',
        'c68720400874625ae1713b50ed86394ae13843e96533def225f7bab679bc21ad',
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

      sequelize.addModels([User, Story, Votes]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
