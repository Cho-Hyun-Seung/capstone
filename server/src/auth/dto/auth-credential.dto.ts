import { IsString, Length, Matches } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @Length(8, 20)
  username: string;

  @IsString()
  // a-z, A-Z, 0-9 허용, ^<>'"; 비허용
  // 4자리 연속된 숫자가 나오는 것 비허용
  @Length(8, 30)
  @Matches(/^[^<>'";]{4,}(?<![a-zA-Z0-9])[^<>'";]*$/, {
    message: '유효하지 않은 비밀번호입니다.',
  })
  // @Matches(/(?=.*[!@#$%^&*()-_=+\\|/,.?~])/, {
  //   message: '특수문자를 최소 1개 이상 포함해야 합니다.',
  // })
  password: string;
}
