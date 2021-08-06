import { Injectable, Inject } from '@nestjs/common';

import { Story } from './story.entity';
import { User } from '../users/entities/user.entity';
import { STORY_REPOSITORY } from '../../core/constants';

@Injectable()
export class StoriesService {
  constructor(
    @Inject(STORY_REPOSITORY) private readonly postRepository: typeof Story,
  ) { }

  async create(story, userId: string): Promise<Story> {
    story.userId = userId
    return await this.postRepository.create<Story>(story);
  }

  async userStorirs(userId: string): Promise<Story[]> {
    return await this.postRepository.findAll<Story>({
      where: { userId },
    });
  }

  async findAll(): Promise<Story[]> {
    return await this.postRepository.findAll<Story>({
      include: [{ model: User, attributes: { exclude: ['id', 'password', 'updatedAt', 'createdAt'] } }],
      order:['createdAt','votes']
    });
  }

  async findOne(id): Promise<Story> {
    return await this.postRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    return await this.postRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.postRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );
    return { numberOfAffectedRows, updatedPost };
  }
}
