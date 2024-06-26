// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UserRepository } from '../user.respository';
// import { User } from '../user.entity';
// import { ConfigService } from '@nestjs/config';
// import { Request as RequestType } from 'express';

// // jwt strategy를 다른곳에서 사용하기 위해서 주입
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     //토큰이 유효한지 확인한 다음 유저 이름을 확인하기 때문에 userRepository를 사용함
//     @InjectRepository(UserRepository)
//     private userRepository: UserRepository,

//     configService: ConfigService,
//   ) {
//     super({
//       // secretOrKey는 토큰이 유효한지 체크할때 사용함.
//       secretOrKey: configService.get('JWT_SECRETKEY'),
//       ignoreExpiration: false,
//       // 인증을 할 때 토큰을 어디에서 가져오는지,
//       // 어떤 타입으로 가져올지 선택
//       // jwtFromRequest: ExtractJwt.fromExtractors([
//       //   JwtStrategy.extractJWT,
//       //   ExtractJwt.fromAuthHeaderAsBearerToken(),
//       // ]),
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     });
//   }

//   async validate(payload: any) {
//     return { userId: payload.userId };
//   }

//   // private static extractJWT(req: RequestType): string | null {
//   //   if (
//   //     req.cookies &&
//   //     'user_token' in req.cookies &&
//   //     req.cookies.user_token / length > 0
//   //   ) {
//   //     return req.cookies.user_token;
//   //   }
//   //   return null;
//   // }
//   // async validate(payload) {
//   //   const { username, password } = payload;
//   //   // 페이로드 안 유저 이름을 통해 데이터베이스에서 유저가 존재하는지 확인
//   //   const user: User = await this.userRepository.findOneBy(username);
//   //   if (!user) {
//   //     throw new UnauthorizedException();
//   //   }

//   //   // 유저를 리턴하여 request 객체에서 유저를 사용할 수 있도록 함
//   //   return user;
//   // }
// }

import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(ConfigService) configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRETKEY'),
    });
  }

  async validate(payload: any) {
    return { user: payload.sub, username: payload.username };
  }
}
