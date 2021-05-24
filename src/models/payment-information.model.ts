import { Entity, model, property, hasMany} from '@loopback/repository';
import {UserTransaction} from './user-transaction.model';
import {UserTransactionPayment} from './user-transaction-payment.model';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'expense_tracker_db', table: 'payment_information' },
  },
})
export class PaymentInformation extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {
      columnName: 'payment_information_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  paymentInformationId: number;

  @property({
    type: 'string',
    length: 25,
    mysql: {
      columnName: 'payment_mode',
      dataType: 'varchar',
      dataLength: 25,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  paymentMode?: string;

  @property({
    type: 'string',
    length: 255,
    mysql: {
      columnName: 'account_name',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  accountName?: string;

  @property({
    type: 'string',
    length: 255,
    mysql: {
      columnName: 'account_information',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  accountInformation?: string;

  @property({
    type: 'string',
    length: 255,
    mysql: {
      columnName: 'payment_reference_number',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  paymentReferenceNumber?: string;

  @property({
    type: 'string',
    length: 255,
    mysql: {
      columnName: 'comments',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  comments?: string;

  @property({
    type: 'string',
    length: 255,
    mysql: {
      columnName: 'upi_id',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  upiId?: string;

  @property({
    type: 'date',
    mysql: {
      columnName: 'created_at',
      dataType: 'datetime',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  createdAt?: string;

  @property({
    type: 'date',
    mysql: {
      columnName: 'updated_at',
      dataType: 'datetime',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  updatedAt?: string;

  @hasMany(() => UserTransaction, {through: {model: () => UserTransactionPayment, keyTo: 'transactionId'}})
  userTransactions: UserTransaction[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PaymentInformation>) {
    super(data);
  }
}

export interface PaymentInformationRelations {
  // describe navigational properties here
}

export type PaymentInformationWithRelations = PaymentInformation & PaymentInformationRelations;
