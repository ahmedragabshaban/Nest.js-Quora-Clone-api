import { Injectable, Inject } from '@nestjs/common';

import { Story } from './story.entity';
import { User } from '../users/entities/user.entity';
import { STORY_REPOSITORY, VOTES_REPOSITORY } from '../../core/constants';
import { Votes } from './votes.entity';

@Injectable()
export class StoriesService {
  constructor(
    @Inject(STORY_REPOSITORY) private readonly storyRepository: typeof Story,
    @Inject(VOTES_REPOSITORY) private readonly votesRepository: typeof Votes,
  ) {}

  async create(story, userId: string): Promise<Story> {
    story.userId = userId;
    return await this.storyRepository.create<Story>(story);
  }

  async upvote(storyId, userId: string): Promise<any> {
    //Check if voted before.
    return await this.votesRepository.findOne({
      where: { storyId, userId },
    });
  }

  async userStorirs(userId: string): Promise<{
    rows: Story[];
    count: number;
  }> {
    return await this.storyRepository.findAndCountAll<Story>({
      where: { userId },
    });
  }

  async findAll(): Promise<{
    rows: Story[];
    count: number;
  }> {
    return await this.storyRepository.findAndCountAll<Story>({
      include: [
        {
          model: User,
          attributes: { exclude: ['id', 'password', 'updatedAt', 'createdAt'] },
        },
      ],
      order: ['createdAt', 'votes'],
    });
  }

  async findOne(id): Promise<Story> {
    return await this.storyRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    return await this.storyRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.storyRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );
    return { numberOfAffectedRows, updatedPost };
  }
}
