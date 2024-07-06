import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const UserId = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // console.log("createParamDecorator::User", request['__user'])
    return request["__user"]?._id || "";
  });