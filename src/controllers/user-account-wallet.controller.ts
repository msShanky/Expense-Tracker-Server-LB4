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
UserAccount,
UserWalletAccess,
Wallet,
} from '../models';
import {UserAccountRepository} from '../repositories';

export class UserAccountWalletController {
  constructor(
    @repository(UserAccountRepository) protected userAccountRepository: UserAccountRepository,
  ) { }

  @get('/user-accounts/{id}/wallets', {
    responses: {
      '200': {
        description: 'Array of UserAccount has many Wallet through UserWalletAccess',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Wallet)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Wallet>,
  ): Promise<Wallet[]> {
    return this.userAccountRepository.wallets(id).find(filter);
  }

  @post('/user-accounts/{id}/wallets', {
    responses: {
      '200': {
        description: 'create a Wallet model instance',
        content: {'application/json': {schema: getModelSchemaRef(Wallet)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserAccount.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wallet, {
            title: 'NewWalletInUserAccount',
            exclude: ['walletId'],
          }),
        },
      },
    }) wallet: Omit<Wallet, 'walletId'>,
  ): Promise<Wallet> {
    return this.userAccountRepository.wallets(id).create(wallet);
  }

  @patch('/user-accounts/{id}/wallets', {
    responses: {
      '200': {
        description: 'UserAccount.Wallet PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wallet, {partial: true}),
        },
      },
    })
    wallet: Partial<Wallet>,
    @param.query.object('where', getWhereSchemaFor(Wallet)) where?: Where<Wallet>,
  ): Promise<Count> {
    return this.userAccountRepository.wallets(id).patch(wallet, where);
  }

  @del('/user-accounts/{id}/wallets', {
    responses: {
      '200': {
        description: 'UserAccount.Wallet DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Wallet)) where?: Where<Wallet>,
  ): Promise<Count> {
    return this.userAccountRepository.wallets(id).delete(where);
  }
}
