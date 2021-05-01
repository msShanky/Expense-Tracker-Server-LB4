import { model, property } from '@loopback/repository';
import { getModelSchemaRef, RequestBodyObject, ResponseObject, ResponsesObject, SchemaObject } from '@loopback/rest';
import { UserAccount } from '../models';

@model()
export class NewUserRequest extends UserAccount {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export const LoginSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
  },
};

export const LoginRequestBody: RequestBodyObject = {
  description: 'The input of the login function',
  required: true,
  content: {
    'application/json': {
      schema: LoginSchema,
    },
  },
};

export const LoginSuccessResponse: ResponseObject = {
  description: 'Token Response for success',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
          },
        },
      },
    },
  },
};

export const LoginResponse: ResponsesObject = {
  '200': LoginSuccessResponse,
};

export const RegisterRequestBody: RequestBodyObject = {
  description: 'The input for the sign up function',
  required: true,
  content: {
    'application/json': {
      schema: getModelSchemaRef(NewUserRequest, {
        includeRelations: false,
        exclude: ['userId', 'emailVerified', 'lastLogin', 'createdAt', 'updatedAt', 'userCredentials'],
      }),
    },
  },
};

export const RegisterSuccessResponse: ResponseObject = {
  description: 'The registration is successfully completed',
  content: {
    'application/json': {
      schema: {
        'x-ts-type': UserAccount,
      },
    },
  },
};

export const RegisterResponse: ResponsesObject = {
  '200': RegisterSuccessResponse,
};

export const WhoAmISuccess: ResponseObject = {
  description: 'The response for the who am I endpoint',
  content: {
    'application/json': {
      schema: {
        type: 'string',
      },
    },
  },
};

export const WhoAmIResponse: ResponsesObject = {
  '200': WhoAmISuccess,
};
