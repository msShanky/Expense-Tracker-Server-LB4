import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
PaymentInformation,
UserTransactionPayment,
UserTransaction,
} from '../models';
import {PaymentInformationRepository} from '../repositories';

export class PaymentInformationUserTransactionController {
  constructor(
    @repository(PaymentInformationRepository) protected paymentInformationRepository: PaymentInformationRepository,
  ) { }

  @get('/payment-informations/{id}/user-transactions', {
    responses: {
      '200': {
        description: 'Array of PaymentInformation has many UserTransaction through UserTransactionPayment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserTransaction)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserTransaction>,
  ): Promise<UserTransaction[]> {
    return this.paymentInformationRepository.userTransactions(id).find(filter);
  }

  @post('/payment-informations/{id}/user-transactions', {
    responses: {
      '200': {
        description: 'create a UserTransaction model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserTransaction)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof PaymentInformation.prototype.paymentInformationId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTransaction, {
            title: 'NewUserTransactionInPaymentInformation',
            exclude: ['transactionId'],
          }),
        },
      },
    }) userTransaction: Omit<UserTransaction, 'transactionId'>,
  ): Promise<UserTransaction> {
    return this.paymentInformationRepository.userTransactions(id).create(userTransaction);
  }

  @patch('/payment-informations/{id}/user-transactions', {
    responses: {
      '200': {
        description: 'PaymentInformation.UserTransaction PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTransaction, {partial: true}),
        },
      },
    })
    userTransaction: Partial<UserTransaction>,
    @param.query.object('where', getWhereSchemaFor(UserTransaction)) where?: Where<UserTransaction>,
  ): Promise<Count> {
    return this.paymentInformationRepository.userTransactions(id).patch(userTransaction, where);
  }

  @del('/payment-informations/{id}/user-transactions', {
    responses: {
      '200': {
        description: 'PaymentInformation.UserTransaction DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserTransaction)) where?: Where<UserTransaction>,
  ): Promise<Count> {
    return this.paymentInformationRepository.userTransactions(id).delete(where);
  }
}
