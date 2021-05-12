import { inject } from '@loopback/core';
import { DefaultTransactionalRepository } from '@loopback/repository';
import { MysqldbDataSource } from '../datasources';
import { UserCredentials, UserCredentialsRelations } from '../models';

export class UserCredentialsRepository extends DefaultTransactionalRepository<
  UserCredentials,
  typeof UserCredentials.prototype.userCredentialsId,
  UserCredentialsRelations
> {
  constructor(@inject('datasources.MYSQLDB') dataSource: MysqldbDataSource) {
    super(UserCredentials, dataSource);
  }
}
