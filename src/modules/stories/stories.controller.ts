import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { StoriesService } from './stories.service';
import { Story as StoryEntity } from './story.entity';
import { StoryDto } from './dto/story.dto';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storieservice: StoriesService) { }

  @Get()
  async findAll() {
    // get all stories in the db
    return await this.storieservice.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user_story')
  async userStorirs(@Request() req) {
    return await this.storieservice.userStorirs(req.user.id);
  }


  @Get(':id')
  async findOne(@Param('id') id: number): Promise<StoryEntity> {
    // find the story with this id
    const story = await this.storieservice.findOne(id);
    // if the story doesn't exit in the db, throw a 404 error
    if (!story) {
      throw new NotFoundException("This Story doesn't exist");
    }
    // if story exist, return the story
    return story;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() story: StoryDto, @Request() req): Promise<StoryEntity> {
    // create a new story and return the newly created story
    return await this.storieservice.create(story, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() story: StoryDto,
    @Request() req): Promise<StoryEntity> {
    // get the number of row affected and the updated story
    const { numberOfAffectedRows, updatedPost } = await this.storieservice.update(
      id,
      story,
      req.user.id,
    );

    // if the number of row affected is zero, it means the story doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Story doesn't exist");
    }

    // return the updated story
    return updatedPost;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the story with this id
    const deleted = await this.storieservice.delete(id, req.user.id);

    // if the number of row affected is zero, then the story doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Story doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
