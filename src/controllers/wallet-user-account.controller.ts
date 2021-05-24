import { Count, CountSchema, Filter, repository, Where } from '@loopback/repository';
import { del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody } from '@loopback/rest';
import { UserAccount, Wallet } from '../models';
import { WalletRepository } from '../repositories';

export class WalletUserAccountController {
  constructor(@repository(WalletRepository) protected walletRepository: WalletRepository) {}

  @get('/wallets/{id}/user-accounts', {
    responses: {
      '200': {
        description: 'Array of Wallet has many UserAccount through UserWalletAccess',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(UserAccount) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserAccount>,
  ): Promise<UserAccount[]> {
    return this.walletRepository.userAccounts(id).find(filter);
  }

  @post('/wallets/{id}/user-accounts', {
    responses: {
      '200': {
        description: 'create a UserAccount model instance',
        content: { 'application/json': { schema: getModelSchemaRef(UserAccount) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Wallet.prototype.walletId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserAccount, {
            title: 'NewUserAccountInWallet',
            exclude: ['id'],
          }),
        },
      },
    })
    userAccount: Omit<UserAccount, 'id'>,
  ): Promise<UserAccount> {
    return this.walletRepository.userAccounts(id).create(userAccount);
  }

  @patch('/wallets/{id}/user-accounts', {
    responses: {
      '200': {
        description: 'Wallet.UserAccount PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserAccount, { partial: true }),
        },
      },
    })
    userAccount: Partial<UserAccount>,
    @param.query.object('where', getWhereSchemaFor(UserAccount)) where?: Where<UserAccount>,
  ): Promise<Count> {
    return this.walletRepository.userAccounts(id).patch(userAccount, where);
  }

  @del('/wallets/{id}/user-accounts', {
    responses: {
      '200': {
        description: 'Wallet.UserAccount DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserAccount)) where?: Where<UserAccount>,
  ): Promise<Count> {
    return this.walletRepository.userAccounts(id).delete(where);
  }
}
