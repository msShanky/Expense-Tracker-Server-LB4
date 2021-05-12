import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MysqldbDataSource } from '../datasources';
import { Wallet, WalletRelations } from '../models';

export class WalletRepository extends DefaultCrudRepository<Wallet, typeof Wallet.prototype.walletId, WalletRelations> {
  constructor(@inject('datasources.MYSQLDB') dataSource: MysqldbDataSource) {
    super(Wallet, dataSource);
  }
}
