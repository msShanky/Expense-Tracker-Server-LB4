import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'expense_tracker_db', table: 'transaction_type' },
  },
})
export class TransactionType extends Entity {
  @property({
    type: 'string',
    length: 150,
    mysql: {
      columnName: 'transaction_type_name',
      dataType: 'varchar',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  transactionTypeName?: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {
      columnName: 'transaction_type_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  transactionTypeId: number;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TransactionType>) {
    super(data);
  }
}

export interface TransactionTypeRelations {
  // describe navigational properties here
}

export type TransactionTypeWithRelations = TransactionType & TransactionTypeRelations;
