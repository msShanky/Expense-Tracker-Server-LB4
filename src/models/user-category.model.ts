import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'expense_tracker_db', table: 'user_category' },
  },
})
export class UserCategory extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {
      columnName: 'category_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  categoryId: number;

  @property({
    type: 'string',
    required: true,
    length: 150,
    mysql: {
      columnName: 'category_name',
      dataType: 'varchar',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  categoryName: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserCategory>) {
    super(data);
  }
}

export interface UserCategoryRelations {
  // describe navigational properties here
}

export type UserCategoryWithRelations = UserCategory & UserCategoryRelations;
