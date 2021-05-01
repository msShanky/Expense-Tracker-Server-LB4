import { Entity, hasOne, model, property } from '@loopback/repository';
import { UserCredentials } from './user-credentials.model';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'expense_tracker_db', table: 'user_account' },
  },
})
export class UserAccount extends Entity {
  @property({
    type: 'number',
    required: false,
    generated: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: { columnName: 'user_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N' },
  })
  userId: number;

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
    type: 'number',
    precision: 3,
    scale: 0,
    mysql: {
      columnName: 'email_verified',
      dataType: 'tinyint',
      dataLength: null,
      dataPrecision: 3,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  emailVerified?: number;

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
