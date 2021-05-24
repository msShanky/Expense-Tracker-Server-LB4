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
  UserCategory,
} from '../models';
import {UserTransactionRepository} from '../repositories';

export class UserTransactionUserCategoryController {
  constructor(
    @repository(UserTransactionRepository)
    public userTransactionRepository: UserTransactionRepository,
  ) { }

  @get('/user-transactions/{id}/user-category', {
    responses: {
      '200': {
        description: 'UserCategory belonging to UserTransaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserCategory)},
          },
        },
      },
    },
  })
  async getUserCategory(
    @param.path.number('id') id: typeof UserTransaction.prototype.transactionId,
  ): Promise<UserCategory> {
    return this.userTransactionRepository.category(id);
  }
}
