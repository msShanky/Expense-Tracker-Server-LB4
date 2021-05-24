import { Getter, inject } from '@loopback/core';
import { DefaultCrudRepository, HasManyThroughRepositoryFactory, repository } from '@loopback/repository';
import { MysqldbDataSource } from '../datasources';
import { UserAccount, UserWalletAccess, Wallet, WalletRelations } from '../models';
import { UserAccountRepository } from './user-account.repository';
import { UserWalletAccessRepository } from './user-wallet-access.repository';

export class WalletRepository extends DefaultCrudRepository<Wallet, typeof Wallet.prototype.walletId, WalletRelations> {
  public readonly userAccounts: HasManyThroughRepositoryFactory<
    UserAccount,
    typeof UserAccount.prototype.id,
    UserWalletAccess,
    typeof Wallet.prototype.walletId
  >;

  constructor(
    @inject('datasources.MYSQLDB') dataSource: MysqldbDataSource,
    @repository.getter('UserWalletAccessRepository')
    protected userWalletAccessRepositoryGetter: Getter<UserWalletAccessRepository>,
    @repository.getter('UserAccountRepository') protected userAccountRepositoryGetter: Getter<UserAccountRepository>,
  ) {
    super(Wallet, dataSource);
    this.userAccounts = this.createHasManyThroughRepositoryFactoryFor(
      'userAccounts',
      userAccountRepositoryGetter,
      userWalletAccessRepositoryGetter,
    );
    this.registerInclusionResolver('userAccounts', this.userAccounts.inclusionResolver);
  }
}
