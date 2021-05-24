import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MysqldbDataSource } from '../datasources';
import { TransactionType, TransactionTypeRelations } from '../models';

export class TransactionTypeRepository extends DefaultCrudRepository<
  TransactionType,
  typeof TransactionType.prototype.transactionTypeId,
  TransactionTypeRelations
> {
  constructor(@inject('datasources.MYSQLDB') dataSource: MysqldbDataSource) {
    super(TransactionType, dataSource);
  }
}
