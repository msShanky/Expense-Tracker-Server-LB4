import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MysqldbDataSource } from '../datasources';
import { UserWalletAccess, UserWalletAccessRelations } from '../models';

export class UserWalletAccessRepository extends DefaultCrudRepository<
  UserWalletAccess,
  typeof UserWalletAccess.prototype.userWalletAccessId,
  UserWalletAccessRelations
> {
  constructor(@inject('datasources.MYSQLDB') dataSource: MysqldbDataSource) {
    super(UserWalletAccess, dataSource);
  }
}
