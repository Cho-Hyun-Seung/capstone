import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username: username,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('이미 존재하는 아이디입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (secret + payload)
      // 페이로드에는 중요한 정보가 들어가면 안됨
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return '로그인 성공';
    } else {
      throw new UnauthorizedException('로그인 실패');
    }
  }
}
