import { Story } from './story.entity';
import { Votes } from './votes.entity';
import { STORY_REPOSITORY, VOTES_REPOSITORY } from '../../core/constants';

export const StoriesProviders = [
  {
    provide: STORY_REPOSITORY,
    useValue: Story,
  },
  {
    provide: VOTES_REPOSITORY,
    useValue: Votes,
  },
];
