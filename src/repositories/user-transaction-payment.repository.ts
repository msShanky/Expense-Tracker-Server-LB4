import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldbDataSource} from '../datasources';
import {UserTransactionPayment, UserTransactionPaymentRelations} from '../models';

export class UserTransactionPaymentRepository extends DefaultCrudRepository<
  UserTransactionPayment,
  typeof UserTransactionPayment.prototype.userTransactionPaymentId,
  UserTransactionPaymentRelations
> {
  constructor(
    @inject('datasources.MYSQLDB') dataSource: MysqldbDataSource,
  ) {
    super(UserTransactionPayment, dataSource);
  }
}
