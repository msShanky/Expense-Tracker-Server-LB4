import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserTransaction,
  TransactionType,
} from '../models';
import {UserTransactionRepository} from '../repositories';

export class UserTransactionTransactionTypeController {
  constructor(
    @repository(UserTransactionRepository)
    public userTransactionRepository: UserTransactionRepository,
  ) { }

  @get('/user-transactions/{id}/transaction-type', {
    responses: {
      '200': {
        description: 'TransactionType belonging to UserTransaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TransactionType)},
          },
        },
      },
    },
  })
  async getTransactionType(
    @param.path.number('id') id: typeof UserTransaction.prototype.transactionId,
  ): Promise<TransactionType> {
    return this.userTransactionRepository.transactionType(id);
  }
}
