import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res: Response): Promise<any> {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );
    res.setHeader('Authorization', 'Bearer ' + accessToken); // 토큰 설정
    res.cookie('accessToken', accessToken, {
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
    });
    res.cookie('refreshToken', refreshToken, {
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
    });
    return res.send({
      message: '로그인 성공',
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }

  @Post('register')
  async registerUser(@Body() authCredentialDto: AuthCredentialDto) {
    return await this.authService.signUp(authCredentialDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Req() req) {
    return await this.authService.refreshToken(req.user);
  }
}
