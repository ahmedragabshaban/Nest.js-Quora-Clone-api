import { Story } from './story.entity';
import { STORY_REPOSITORY } from '../../core/constants';

export const StoriesProviders = [
  {
    provide: STORY_REPOSITORY,
    useValue: Story,
  },
];
