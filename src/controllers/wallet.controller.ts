import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';
import { Count, CountSchema, repository } from '@loopback/repository';
import { get, getModelSchemaRef, param, post, requestBody, response } from '@loopback/rest';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { Wallet } from '../models';
import { WalletRepository } from '../repositories';
import { walletCreationRequest, walletCreationResponse } from '../specs/wallet.specs';

@authenticate('jwt')
export class WalletController {
  constructor(
    @repository(WalletRepository)
    public walletRepository: WalletRepository,
  ) {}

  @post('/wallets')
  @response(200, walletCreationResponse)
  async create(
    @requestBody(walletCreationRequest) walletBody: Omit<Wallet, 'walletId' | 'userId'>,
    @inject(SecurityBindings.USER) currentUser: UserProfile,
  ): Promise<Wallet> {
    return this.walletRepository.create({ ...walletBody, userId: currentUser[securityId] });
  }

  @get('/wallets/count')
  @response(200, {
    description: 'Wallet model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(@inject(SecurityBindings.USER) currentUser: UserProfile): Promise<Count> {
    return this.walletRepository.count({
      where: {
        userId: currentUser[securityId],
      },
    });
  }

  @get('/wallets')
  @response(200, {
    description: 'Array of Wallet model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Wallet, { includeRelations: true }),
        },
      },
    },
  })
  async find(@inject(SecurityBindings.USER) currentUser: UserProfile): Promise<Wallet[]> {
    return this.walletRepository.find({
      where: {
        userId: currentUser[securityId],
      },
    });
  }

  // @patch('/wallets')
  // @response(200, {
  //   description: 'Wallet PATCH success count',
  //   content: { 'application/json': { schema: CountSchema } },
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Wallet, { partial: true }),
  //       },
  //     },
  //   })
  //   wallet: Wallet,
  //   @param.where(Wallet) where?: Where<Wallet>,
  // ): Promise<Count> {
  //   return this.walletRepository.updateAll(wallet, where);
  // }

  @get('/wallets/{id}')
  @response(200, {
    description: 'Wallet model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Wallet, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @inject(SecurityBindings.USER) currentUser: UserProfile,
  ): Promise<Wallet | null> {
    return this.walletRepository.findOne({
      where: {
        and: [{ userId: currentUser[securityId] }, { walletId: id }],
      },
    });
  }

  // @patch('/wallets/{id}')
  // @response(204, {
  //   description: 'Wallet PATCH success',
  // })
  // async updateById(
  //   @param.path.number('id') id: number,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Wallet, { partial: true }),
  //       },
  //     },
  //   })
  //   wallet: Wallet,
  // ): Promise<void> {
  //   await this.walletRepository.updateById(id, wallet);
  // }

  // @put('/wallets/{id}')
  // @response(204, {
  //   description: 'Wallet PUT success',
  // })
  // async replaceById(@param.path.number('id') id: number, @requestBody() wallet: Wallet): Promise<void> {
  //   await this.walletRepository.replaceById(id, wallet);
  // }

  // @del('/wallets/{id}')
  // @response(204, {
  //   description: 'Wallet DELETE success',
  // })
  // async deleteById(@param.path.number('id') id: number): Promise<void> {
  //   await this.walletRepository.deleteById(id);
  // }
}
