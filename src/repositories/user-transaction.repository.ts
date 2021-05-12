import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldbDataSource} from '../datasources';
import {UserTransaction, UserTransactionRelations} from '../models';

export class UserTransactionRepository extends DefaultCrudRepository<
  UserTransaction,
  typeof UserTransaction.prototype.transactionId,
  UserTransactionRelations
> {
  constructor(
    @inject('datasources.MYSQLDB') dataSource: MysqldbDataSource,
  ) {
    super(UserTransaction, dataSource);
  }
}
