import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldbDataSource} from '../datasources';
import {MasterCategory, MasterCategoryRelations} from '../models';

export class MasterCategoryRepository extends DefaultCrudRepository<
  MasterCategory,
  typeof MasterCategory.prototype.categoryId,
  MasterCategoryRelations
> {
  constructor(
    @inject('datasources.MYSQLDB') dataSource: MysqldbDataSource,
  ) {
    super(MasterCategory, dataSource);
  }
}
