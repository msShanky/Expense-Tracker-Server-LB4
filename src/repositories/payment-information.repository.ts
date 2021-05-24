import { inject, Getter} from '@loopback/core';
import { DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import { MysqldbDataSource } from '../datasources';
import { PaymentInformation, PaymentInformationRelations, UserTransaction, UserTransactionPayment} from '../models';
import {UserTransactionPaymentRepository} from './user-transaction-payment.repository';
import {UserTransactionRepository} from './user-transaction.repository';

export class PaymentInformationRepository extends DefaultCrudRepository<
  PaymentInformation,
  typeof PaymentInformation.prototype.paymentInformationId,
  PaymentInformationRelations
> {

  public readonly userTransactions: HasManyThroughRepositoryFactory<UserTransaction, typeof UserTransaction.prototype.transactionId,
          UserTransactionPayment,
          typeof PaymentInformation.prototype.paymentInformationId
        >;

  constructor(@inject('datasources.MYSQLDB') dataSource: MysqldbDataSource, @repository.getter('UserTransactionPaymentRepository') protected userTransactionPaymentRepositoryGetter: Getter<UserTransactionPaymentRepository>, @repository.getter('UserTransactionRepository') protected userTransactionRepositoryGetter: Getter<UserTransactionRepository>,) {
    super(PaymentInformation, dataSource);
    this.userTransactions = this.createHasManyThroughRepositoryFactoryFor('userTransactions', userTransactionRepositoryGetter, userTransactionPaymentRepositoryGetter,);
    this.registerInclusionResolver('userTransactions', this.userTransactions.inclusionResolver);
  }
}
