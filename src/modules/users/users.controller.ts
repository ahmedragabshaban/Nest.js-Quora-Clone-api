import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }



  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getUser(@Request() req) {
    return this.usersService.findOneById(req.user.id);
  }


}
