import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {UserAccount, UserAccountRelations} from '../models';

export class UserAccountRepository extends DefaultCrudRepository<
  UserAccount,
  typeof UserAccount.prototype.userId,
  UserAccountRelations
> {
  constructor(
    @inject('datasources.PGSql') dataSource: PgSqlDataSource,
  ) {
    super(UserAccount, dataSource);
  }
}
