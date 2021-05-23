import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, repository } from '@loopback/repository';
import { MysqldbDataSource } from '../datasources';
import { TransactionType, UserTransaction, UserTransactionRelations, Wallet, PaymentInformation} from '../models';
import { TransactionTypeRepository } from './transaction-type.repository';
import { WalletRepository } from './wallet.repository';
import {PaymentInformationRepository} from './payment-information.repository';

export class UserTransactionRepository extends DefaultCrudRepository<
  UserTransaction,
  typeof UserTransaction.prototype.transactionId,
  UserTransactionRelations
> {
  public readonly TransactionCreditedTo: BelongsToAccessor<Wallet, typeof UserTransaction.prototype.transactionId>;

  public readonly TransactionDebitedFrom: BelongsToAccessor<Wallet, typeof UserTransaction.prototype.transactionId>;

  public readonly transactionType: BelongsToAccessor<TransactionType, typeof UserTransaction.prototype.transactionId>;

  public readonly paymentInformation: BelongsToAccessor<PaymentInformation, typeof UserTransaction.prototype.transactionId>;

  constructor(
    @inject('datasources.MYSQLDB') dataSource: MysqldbDataSource,
    @repository.getter('WalletRepository') protected walletRepositoryGetter: Getter<WalletRepository>,
    @repository.getter('TransactionTypeRepository')
    protected transactionTypeRepositoryGetter: Getter<TransactionTypeRepository>, @repository.getter('PaymentInformationRepository') protected paymentInformationRepositoryGetter: Getter<PaymentInformationRepository>,
  ) {
    super(UserTransaction, dataSource);
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
