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
  Wallet,
} from '../models';
import {UserTransactionRepository} from '../repositories';

export class UserTransactionWalletController {
  constructor(
    @repository(UserTransactionRepository)
    public userTransactionRepository: UserTransactionRepository,
  ) { }

  @get('/user-transactions/{id}/wallet', {
    responses: {
      '200': {
        description: 'Wallet belonging to UserTransaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Wallet)},
          },
        },
      },
    },
  })
  async getWallet(
    @param.path.number('id') id: typeof UserTransaction.prototype.transactionId,
  ): Promise<Wallet> {
    return this.userTransactionRepository.TransactionDebitedFrom(id);
  }
}
