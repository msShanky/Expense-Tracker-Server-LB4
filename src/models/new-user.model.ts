import { User } from '@loopback/authentication-jwt';
import { model, property } from '@loopback/repository';

@model()
export class NewUser extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}
