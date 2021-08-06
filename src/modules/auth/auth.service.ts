import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { UsersService } from '../users/users.service';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,

  ) { }

  async validateUser(phone: string) {
    // find if user exist with this Phone
    const user = await this.userService.findOneByPhone(phone);
    if (!user) {
      return null;
    }
    const { ...result } = user['dataValues'];
    return await this.login(result);
  }

  public async login(user) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user) {
    // create the user
    const newUser = await this.userService.create(user);
    // tslint:disable-next-line: no-string-literal
    const { ...result } = newUser['dataValues'];
    // generate token
    const token = await this.generateToken(result);
    // return the user and the token
    return { user: result, token };
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

}
