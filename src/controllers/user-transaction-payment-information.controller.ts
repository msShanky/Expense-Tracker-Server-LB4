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
  PaymentInformation,
} from '../models';
import {UserTransactionRepository} from '../repositories';

export class UserTransactionPaymentInformationController {
  constructor(
    @repository(UserTransactionRepository)
    public userTransactionRepository: UserTransactionRepository,
  ) { }

  @get('/user-transactions/{id}/payment-information', {
    responses: {
      '200': {
        description: 'PaymentInformation belonging to UserTransaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PaymentInformation)},
          },
        },
      },
    },
  })
  async getPaymentInformation(
    @param.path.number('id') id: typeof UserTransaction.prototype.transactionId,
  ): Promise<PaymentInformation> {
    return this.userTransactionRepository.paymentInformation(id);
  }
}
