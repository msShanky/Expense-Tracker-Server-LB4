import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import { MysqldbDataSource } from '../datasources';
import { TransactionType, UserTransaction, UserTransactionRelations, Wallet, PaymentInformation, UserCategory, UserTransactionPayment} from '../models';
import { TransactionTypeRepository } from './transaction-type.repository';
import { WalletRepository } from './wallet.repository';
import {PaymentInformationRepository} from './payment-information.repository';
import {UserCategoryRepository} from './user-category.repository';
import {UserTransactionPaymentRepository} from './user-transaction-payment.repository';

export class UserTransactionRepository extends DefaultCrudRepository<
  UserTransaction,
  typeof UserTransaction.prototype.transactionId,
  UserTransactionRelations
> {
  public readonly TransactionCreditedTo: BelongsToAccessor<Wallet, typeof UserTransaction.prototype.transactionId>;

  public readonly TransactionDebitedFrom: BelongsToAccessor<Wallet, typeof UserTransaction.prototype.transactionId>;

  public readonly transactionType: BelongsToAccessor<TransactionType, typeof UserTransaction.prototype.transactionId>;

  public readonly paymentInformation: BelongsToAccessor<PaymentInformation, typeof UserTransaction.prototype.transactionId>;

  public readonly category: BelongsToAccessor<UserCategory, typeof UserTransaction.prototype.transactionId>;

  public readonly paymentInformations: HasManyThroughRepositoryFactory<PaymentInformation, typeof PaymentInformation.prototype.paymentInformationId,
          UserTransactionPayment,
          typeof UserTransaction.prototype.transactionId
        >;

  constructor(
    @inject('datasources.MYSQLDB') dataSource: MysqldbDataSource,
    @repository.getter('WalletRepository') protected walletRepositoryGetter: Getter<WalletRepository>,
    @repository.getter('TransactionTypeRepository')
    protected transactionTypeRepositoryGetter: Getter<TransactionTypeRepository>, @repository.getter('PaymentInformationRepository') protected paymentInformationRepositoryGetter: Getter<PaymentInformationRepository>, @repository.getter('UserCategoryRepository') protected userCategoryRepositoryGetter: Getter<UserCategoryRepository>, @repository.getter('UserTransactionPaymentRepository') protected userTransactionPaymentRepositoryGetter: Getter<UserTransactionPaymentRepository>,
  ) {
    super(UserTransaction, dataSource);
    this.paymentInformations = this.createHasManyThroughRepositoryFactoryFor('paymentInformations', paymentInformationRepositoryGetter, userTransactionPaymentRepositoryGetter,);
    this.registerInclusionResolver('paymentInformations', this.paymentInformations.inclusionResolver);
    this.category = this.createBelongsToAccessorFor('category', userCategoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
    this.paymentInformation = this.createBelongsToAccessorFor('paymentInformation', paymentInformationRepositoryGetter,);
    this.registerInclusionResolver('paymentInformation', this.paymentInformation.inclusionResolver);
    this.transactionType = this.createBelongsToAccessorFor('transactionType', transactionTypeRepositoryGetter);
    this.registerInclusionResolver('transactionType', this.transactionType.inclusionResolver);
    this.TransactionDebitedFrom = this.createBelongsToAccessorFor('debitedFromWallet', walletRepositoryGetter);
    this.registerInclusionResolver('debitedFromWallet', this.TransactionDebitedFrom.inclusionResolver);
    this.TransactionCreditedTo = this.createBelongsToAccessorFor('creditedToWallet', walletRepositoryGetter);
    this.registerInclusionResolver('creditedToWallet', this.TransactionCreditedTo.inclusionResolver);
  }
}
