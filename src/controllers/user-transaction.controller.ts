import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UserTransaction} from '../models';
import {UserTransactionRepository} from '../repositories';

export class UserTransactionController {
  constructor(
    @repository(UserTransactionRepository)
    public userTransactionRepository : UserTransactionRepository,
  ) {}

  @post('/user-transactions')
  @response(200, {
    description: 'UserTransaction model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserTransaction)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTransaction, {
            title: 'NewUserTransaction',
            exclude: ['transactionId'],
          }),
        },
      },
    })
    userTransaction: Omit<UserTransaction, 'transactionId'>,
  ): Promise<UserTransaction> {
    return this.userTransactionRepository.create(userTransaction);
  }

  @get('/user-transactions/count')
  @response(200, {
    description: 'UserTransaction model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserTransaction) where?: Where<UserTransaction>,
  ): Promise<Count> {
    return this.userTransactionRepository.count(where);
  }

  @get('/user-transactions')
  @response(200, {
    description: 'Array of UserTransaction model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserTransaction, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserTransaction) filter?: Filter<UserTransaction>,
  ): Promise<UserTransaction[]> {
    return this.userTransactionRepository.find(filter);
  }

  @patch('/user-transactions')
  @response(200, {
    description: 'UserTransaction PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTransaction, {partial: true}),
        },
      },
    })
    userTransaction: UserTransaction,
    @param.where(UserTransaction) where?: Where<UserTransaction>,
  ): Promise<Count> {
    return this.userTransactionRepository.updateAll(userTransaction, where);
  }

  @get('/user-transactions/{id}')
  @response(200, {
    description: 'UserTransaction model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserTransaction, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserTransaction, {exclude: 'where'}) filter?: FilterExcludingWhere<UserTransaction>
  ): Promise<UserTransaction> {
    return this.userTransactionRepository.findById(id, filter);
  }

  @patch('/user-transactions/{id}')
  @response(204, {
    description: 'UserTransaction PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTransaction, {partial: true}),
        },
      },
    })
    userTransaction: UserTransaction,
  ): Promise<void> {
    await this.userTransactionRepository.updateById(id, userTransaction);
  }

  @put('/user-transactions/{id}')
  @response(204, {
    description: 'UserTransaction PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userTransaction: UserTransaction,
  ): Promise<void> {
    await this.userTransactionRepository.replaceById(id, userTransaction);
  }

  @del('/user-transactions/{id}')
  @response(204, {
    description: 'UserTransaction DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userTransactionRepository.deleteById(id);
  }
}
