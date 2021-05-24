import { Entity, model, property, hasMany} from '@loopback/repository';
import {UserAccount} from './user-account.model';
import {UserWalletAccess} from './user-wallet-access.model';

@model({
  settings: { idInjection: false, mysql: { schema: 'expense_tracker_db', table: 'wallet' } },
})
export class Wallet extends Entity {
  @property({
    type: 'number',
    required: false,
    generated: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {
      columnName: 'wallet_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  walletId?: number;

  @property({
    type: 'string',
    required: true,
    length: 200,
    mysql: {
      columnName: 'wallet_name',
      dataType: 'varchar',
      dataLength: 200,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  walletName: string;

  @property({
    type: 'string',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'created_by',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  createdBy: string;

  @property({
    type: 'string',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'updated_by',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  updatedBy: string;

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

  @hasMany(() => UserAccount, {through: {model: () => UserWalletAccess, keyTo: 'userId'}})
  userAccounts: UserAccount[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Wallet>) {
    super(data);
  }
}

export interface WalletRelations {
  // describe navigational properties here
}

export type WalletWithRelations = Wallet & WalletRelations;
