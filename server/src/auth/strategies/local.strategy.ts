import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/auth-credential.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'user_id',
    });
  }
  async validate(user_id: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ user_id, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
