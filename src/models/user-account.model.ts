import { Entity, hasMany, hasOne, model, property } from '@loopback/repository';
import { UserCredentials } from './user-credentials.model';
import { Wallet } from './wallet.model';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'expense_tracker_db', table: 'user_account' },
  },
})
export class UserAccount extends Entity {
  @property({
    type: 'string',
    required: true,
    precision: 10,
    scale: 0,
    defaultFn: 'uuidv4',
    id: true,
    mysql: {
      columnName: 'user_id',
      dataType: 'varchar',
      dataLength: 30,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  id: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'user_name',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  userName?: string;

  @property({
    type: 'string',
    required: true,
    length: 60,
    mysql: {
      columnName: 'email',
      dataType: 'varchar',
      dataLength: 60,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  email: string;

  @property({
    type: 'boolean',
    precision: 1,
    scale: 0,
    mysql: {
      columnName: 'email_verified',
      dataType: 'tinyint',
      dataLength: null,
      dataPrecision: 1,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  emailVerified?: boolean;

  @property({
    type: 'string',
    required: true,
    length: 100,
    mysql: {
      columnName: 'first_name',
      dataType: 'varchar',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  firstName: string;

  @property({
    type: 'string',
    length: 100,
    mysql: {
      columnName: 'last_name',
      dataType: 'varchar',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  lastName?: string;

  @property({
    type: 'date',
    mysql: {
      columnName: 'last_login',
      dataType: 'datetime',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  lastLogin?: string;

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

  @hasOne(() => UserCredentials, { keyTo: 'userId' })
  userCredentials: UserCredentials;

  @hasMany(() => Wallet, { keyTo: 'userId' })
  wallets: Wallet[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserAccount>) {
    super(data);
  }
}

export interface UserAccountRelations {
  // describe navigational properties here
}

export type UserAccountWithRelations = UserAccount & UserAccountRelations;
