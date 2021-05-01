import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MysqldbDataSource } from '../datasources';
import { UserCredentials, UserCredentialsRelations } from '../models';

export class UserCredentialsRepository extends DefaultCrudRepository<
  UserCredentials,
  typeof UserCredentials.prototype.userCredentialsId,
  UserCredentialsRelations
> {
  constructor(@inject('datasources.MYSQLDB') dataSource: MysqldbDataSource) {
    super(UserCredentials, dataSource);
  }
}
