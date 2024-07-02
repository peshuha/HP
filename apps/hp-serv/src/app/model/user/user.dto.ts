import { IUser } from "@vkr/hp-lib"

export class UserDto implements IUser {
  id?: string 
  login: string = ""
  password: string = ""
  email?: string
  name?: string
  lastname?: string
  cardNumber?: string
  city?: string
  age?: number
}
