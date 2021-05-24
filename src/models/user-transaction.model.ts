import { belongsTo, Entity, hasMany, model, property } from '@loopback/repository';
import { PaymentInformation } from './payment-information.model';
import { TransactionType } from './transaction-type.model';
import { UserCategory } from './user-category.model';
import { UserTransactionPayment } from './user-transaction-payment.model';
import { Wallet } from './wallet.model';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'expense_tracker_db', table: 'user_transaction' },
  },
})
export class UserTransaction extends Entity {
  @property({
    type: 'number',
    required: false,
    generated: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {
      columnName: 'transaction_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  transactionId: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'amount',
      dataType: 'decimal',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 2,
      nullable: 'N',
    },
  })
  amount: number;

  @property({
    type: 'string',
    length: 150,
    mysql: {
      columnName: 'narrative',
      dataType: 'varchar',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  narrative?: string;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'transaction_date',
      dataType: 'datetime',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  transactionDate: Date;

  @property({
    type: 'string',
    length: 150,
    mysql: {
      columnName: 'bank_reference_number',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  bankReferenceNumber?: string;

  @property({
    type: 'string',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'user_id',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  userId: string;

  @belongsTo(() => Wallet, { name: 'creditedToWallet' }, { name: 'credited_wallet_id' })
  creditedWalletId: number;

  @belongsTo(() => Wallet, { name: 'debitedFromWallet' }, { name: 'debited_wallet_id' })
  debitedWalletId: number;

  @belongsTo(() => TransactionType, { name: 'transactionType' }, { name: 'transaction_type_id' })
  transactionTypeId: number;

  @belongsTo(() => PaymentInformation)
  paymentInformationId: number;

  @belongsTo(() => UserCategory, { name: 'UserCategory' }, { name: 'category_id' })
  categoryId: number;

  @hasMany(() => PaymentInformation, { through: { model: () => UserTransactionPayment, keyFrom: 'transactionId' } })
  paymentInformations: PaymentInformation[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserTransaction>) {
    super(data);
  }
}

export interface UserTransactionRelations {
  // describe navigational properties here
}

export type UserTransactionWithRelations = UserTransaction & UserTransactionRelations;
