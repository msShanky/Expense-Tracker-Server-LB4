import { getModelSchemaRef, RequestBodyObject, ResponseObject } from '@loopback/rest';
import { Wallet } from '../models';

export const walletCreationRequest: RequestBodyObject = {
  content: {
    'application/json': {
      schema: getModelSchemaRef(Wallet, {
        title: 'NewWallet',
        exclude: ['walletId', 'userId'],
      }),
    },
  },
};

export const walletCreationResponse: ResponseObject = {
  description: 'Wallet model instance',
  content: {
    'application/json': {
      schema: getModelSchemaRef(Wallet, {
        exclude: ['walletId', 'userId'],
      }),
    },
  },
};
