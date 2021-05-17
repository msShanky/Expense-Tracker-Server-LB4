import { getModelSchemaRef, RequestBodyObject, ResponseObject } from '@loopback/rest';
import { UserTransaction } from '../models';

export const UserTransactionPostRequest: RequestBodyObject = {
  content: {
    'application/json': {
      schema: getModelSchemaRef(UserTransaction, {
        title: 'NewUserTransaction',
        exclude: ['transactionId', 'userId'],
      }),
    },
  },
};

export const UserTransactionGetResponse: ResponseObject = {
  description: 'Array of UserTransaction model instances',
  content: {
    'application/json': {
      schema: {
        type: 'array',
        items: getModelSchemaRef(UserTransaction, { includeRelations: true }),
      },
    },
  },
};
