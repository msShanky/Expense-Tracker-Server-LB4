import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

const config = {
  name: 'MYSQLDB',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'expense_tracker_app',
  password: 'LkYkHajWQr',
  database: 'expense_tracker_db',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqldbDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'MYSQLDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MYSQLDB', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
