import { Getter, inject } from '@loopback/core';
import {
  DefaultTransactionalRepository,
  HasManyRepositoryFactory,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import { MysqldbDataSource } from '../datasources';
import { UserAccount, UserAccountRelations, UserCredentials, Wallet } from '../models';
import { UserCredentialsRepository } from './user-credentials.repository';
import { WalletRepository } from './wallet.repository';

export class UserAccountRepository extends DefaultTransactionalRepository<
  UserAccount,
  typeof UserAccount.prototype.id,
  UserAccountRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof UserAccount.prototype.id>;
  public readonly wallets: HasManyRepositoryFactory<Wallet, typeof UserAccount.prototype.id>;

  constructor(
    @inject('datasources.MYSQLDB') dataSource: MysqldbDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
    @repository.getter('WalletRepository') protected walletRepositoryGetter: Getter<WalletRepository>,
  ) {
    super(UserAccount, dataSource);
    this.wallets = this.createHasManyRepositoryFactoryFor('wallets', walletRepositoryGetter);
    this.registerInclusionResolver('wallets', this.wallets.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
  }

  public async findCredentials(userId: typeof UserAccount.prototype.id): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (error) {
      // If the record does not exist return undefined
      if (error.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      // Throw all the errors by default
      throw error;
    }
  }
}
