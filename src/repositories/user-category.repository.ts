import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldbDataSource} from '../datasources';
import {UserCategory, UserCategoryRelations} from '../models';

export class UserCategoryRepository extends DefaultCrudRepository<
  UserCategory,
  typeof UserCategory.prototype.categoryId,
  UserCategoryRelations
> {
  constructor(
    @inject('datasources.MYSQLDB') dataSource: MysqldbDataSource,
  ) {
    super(UserCategory, dataSource);
  }
}
