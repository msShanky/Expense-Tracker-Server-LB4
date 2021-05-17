import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';
import { Count, CountSchema, FilterExcludingWhere, repository } from '@loopback/repository';
import { del, get, getModelSchemaRef, param, patch, post, put, requestBody, response } from '@loopback/rest';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { UserTransaction } from '../models';
import { UserTransactionRepository } from '../repositories';
import { UserTransactionGetResponse, UserTransactionPostRequest } from '../specs/user.transaction.specs';
@authenticate('jwt')
export class UserTransactionController {
  constructor(
    @repository(UserTransactionRepository)
    public userTransactionRepository: UserTransactionRepository,
    @inject(SecurityBindings.USER) public currentUser: UserProfile,
  ) {}

  @post('/user-transactions')
  @response(200, {
    description: 'UserTransaction model instance',
    content: { 'application/json': { schema: getModelSchemaRef(UserTransaction) } },
  })
  async create(
    @requestBody(UserTransactionPostRequest)
    userTransaction: Omit<UserTransaction, 'transactionId' | 'userId'>,
  ): Promise<UserTransaction> {
    console.log('THE BODY RECEIVED FOR THE CREATION IS', userTransaction);
    const userId = this.currentUser[securityId];
    return this.userTransactionRepository.create({ ...userTransaction, userId });
  }

  @get('/user-transactions/count')
  @response(200, {
    description: 'UserTransaction model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(): Promise<Count> {
    const userId = this.currentUser[securityId];
    return this.userTransactionRepository.count({ userId });
  }

  @get('/user-transactions')
  @response(200, UserTransactionGetResponse)
  async find(): Promise<UserTransaction[]> {
    const userId = this.currentUser[securityId];
    return this.userTransactionRepository.find({
      where: { userId },
      include: ['creditedToWallet', 'debitedFromWallet', 'transactionType'],
    });
  }

  // @patch('/user-transactions')
  // @response(200, {
  //   description: 'UserTransaction PATCH success count',
  //   content: { 'application/json': { schema: CountSchema } },
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(UserTransaction, { partial: true }),
  //       },
  //     },
  //   })
  //   userTransaction: UserTransaction,
  //   @param.where(UserTransaction) where?: Where<UserTransaction>,
  // ): Promise<Count> {
  //   return this.userTransactionRepository.updateAll(userTransaction, where);
  // }

  @get('/user-transactions/{id}')
  @response(200, {
    description: 'UserTransaction model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserTransaction, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserTransaction, { exclude: 'where' }) filter?: FilterExcludingWhere<UserTransaction>,
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
          schema: getModelSchemaRef(UserTransaction, { partial: true }),
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
