import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'expense_tracker_db', table: 'user_credentials' },
  },
})
export class UserCredentials extends Entity {
  @property({
    type: 'string',
    required: false,
    generated: false,
    length: 255,
    id: true,
    defaultFn: 'uuidv4',
    mysql: {
      columnName: 'user_credentials_id',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mysql: {
      columnName: 'user_id',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  userId: string;

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
  password: string;

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
