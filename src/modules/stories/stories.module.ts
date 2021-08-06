import { Module } from '@nestjs/common';

import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { StoriesProviders } from './stories.providers';

@Module({
  providers: [StoriesService, ...StoriesProviders],
  controllers: [StoriesController],
})
export class StoriesModule { }
