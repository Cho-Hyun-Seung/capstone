import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  console.log(data, ctx);
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
