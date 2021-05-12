import { Count, CountSchema, Filter, repository, Where } from '@loopback/repository';
import { del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody } from '@loopback/rest';
import { UserAccount, UserCredentials } from '../models';
import { UserAccountRepository } from '../repositories';

export class UserAccountUserCredentialsController {
  constructor(@repository(UserAccountRepository) protected userAccountRepository: UserAccountRepository) {}

  @get('/user-accounts/{id}/user-credentials', {
    responses: {
      '200': {
        description: 'UserAccount has one UserCredentials',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserCredentials),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UserCredentials>,
  ): Promise<UserCredentials> {
    return this.userAccountRepository.userCredentials(id).get(filter);
  }

  @post('/user-accounts/{id}/user-credentials', {
    responses: {
      '200': {
        description: 'UserAccount model instance',
        content: { 'application/json': { schema: getModelSchemaRef(UserCredentials) } },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserAccount.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredentials, {
            title: 'NewUserCredentialsInUserAccount',
            exclude: ['userCredentialsId'],
            optional: ['userId'],
          }),
        },
      },
    })
    userCredentials: Omit<UserCredentials, 'userCredentialsId'>,
  ): Promise<UserCredentials> {
    return this.userAccountRepository.userCredentials(id).create(userCredentials);
  }

  @patch('/user-accounts/{id}/user-credentials', {
    responses: {
      '200': {
        description: 'UserAccount.UserCredentials PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredentials, { partial: true }),
        },
      },
    })
    userCredentials: Partial<UserCredentials>,
    @param.query.object('where', getWhereSchemaFor(UserCredentials)) where?: Where<UserCredentials>,
  ): Promise<Count> {
    return this.userAccountRepository.userCredentials(id).patch(userCredentials, where);
  }

  @del('/user-accounts/{id}/user-credentials', {
    responses: {
      '200': {
        description: 'UserAccount.UserCredentials DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserCredentials)) where?: Where<UserCredentials>,
  ): Promise<Count> {
    return this.userAccountRepository.userCredentials(id).delete(where);
  }
}
