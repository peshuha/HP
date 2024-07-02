import { IAuth } from "@vkr/hp-lib";

export class AuthDto implements IAuth {
  login: string = '';
  password: string = '';
  email?: string | undefined;
}
