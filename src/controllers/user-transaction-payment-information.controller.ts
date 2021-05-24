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
UserTransaction,
UserTransactionPayment,
PaymentInformation,
} from '../models';
import {UserTransactionRepository} from '../repositories';

export class UserTransactionPaymentInformationController {
  constructor(
    @repository(UserTransactionRepository) protected userTransactionRepository: UserTransactionRepository,
  ) { }

  @get('/user-transactions/{id}/payment-informations', {
    responses: {
      '200': {
        description: 'Array of UserTransaction has many PaymentInformation through UserTransactionPayment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PaymentInformation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PaymentInformation>,
  ): Promise<PaymentInformation[]> {
    return this.userTransactionRepository.paymentInformations(id).find(filter);
  }

  @post('/user-transactions/{id}/payment-informations', {
    responses: {
      '200': {
        description: 'create a PaymentInformation model instance',
        content: {'application/json': {schema: getModelSchemaRef(PaymentInformation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof UserTransaction.prototype.transactionId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentInformation, {
            title: 'NewPaymentInformationInUserTransaction',
            exclude: ['paymentInformationId'],
          }),
        },
      },
    }) paymentInformation: Omit<PaymentInformation, 'paymentInformationId'>,
  ): Promise<PaymentInformation> {
    return this.userTransactionRepository.paymentInformations(id).create(paymentInformation);
  }

  @patch('/user-transactions/{id}/payment-informations', {
    responses: {
      '200': {
        description: 'UserTransaction.PaymentInformation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentInformation, {partial: true}),
        },
      },
    })
    paymentInformation: Partial<PaymentInformation>,
    @param.query.object('where', getWhereSchemaFor(PaymentInformation)) where?: Where<PaymentInformation>,
  ): Promise<Count> {
    return this.userTransactionRepository.paymentInformations(id).patch(paymentInformation, where);
  }

  @del('/user-transactions/{id}/payment-informations', {
    responses: {
      '200': {
        description: 'UserTransaction.PaymentInformation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PaymentInformation)) where?: Where<PaymentInformation>,
  ): Promise<Count> {
    return this.userTransactionRepository.paymentInformations(id).delete(where);
  }
}
