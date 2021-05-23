import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MysqldbDataSource } from '../datasources';
import { PaymentInformation, PaymentInformationRelations } from '../models';

export class PaymentInformationRepository extends DefaultCrudRepository<
  PaymentInformation,
  typeof PaymentInformation.prototype.paymentInformationId,
  PaymentInformationRelations
> {
  constructor(@inject('datasources.MYSQLDB') dataSource: MysqldbDataSource) {
    super(PaymentInformation, dataSource);
  }
}
