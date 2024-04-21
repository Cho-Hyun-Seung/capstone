import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from './user.respository';
import { AuthCredentialDto, LoginDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { FindOneOptions } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return await this.userRepository.createUser(authCredentialDto);
  }

  // async signIn(LoginDto: LoginDto): Promise<{ accessToken: string }> {
  //   return await this.userRepository.create(LoginDto);
  // }

  // async validateUser(loginDto: LoginDto): Promise<any> {
  //   return await this.userRepository.login(loginDto);
  // }

  async validateUser(loginDto: LoginDto): Promise<any> {
    return await this.userRepository.validateUser(loginDto);
  }

  async login(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    return await this.userRepository.login(user);
  }

  async refreshToken(user: User) {
    return await this.userRepository.refreshToken(user);
  }
}
