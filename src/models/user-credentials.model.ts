import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'expense_tracker_db', table: 'user_credentials' },
  },
})
export class UserCredentials extends Entity {
  @property({
    type: 'number',
    required: false,
    generated: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {
      columnName: 'user_credentials_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  userCredentialsId: number;

  @property({
    type: 'string',
    required: true,
    length: 100,
    mysql: {
      columnName: 'user_password',
      dataType: 'varchar',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  userPassword: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { columnName: 'user_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N' },
  })
  userId: number;

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

  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredentials & UserCredentialsRelations;
