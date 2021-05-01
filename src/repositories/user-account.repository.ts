import { Getter, inject } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, repository } from '@loopback/repository';
import { MysqldbDataSource } from '../datasources';
import { UserAccount, UserAccountRelations, UserCredentials } from '../models';
import { UserCredentialsRepository } from './user-credentials.repository';

export class UserAccountRepository extends DefaultCrudRepository<
  UserAccount,
  typeof UserAccount.prototype.userId,
  UserAccountRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof UserAccount.prototype.userId>;

  constructor(
    @inject('datasources.MYSQLDB') dataSource: MysqldbDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
  ) {
    super(UserAccount, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
  }

  public async findCredentials(userId: typeof UserAccount.prototype.userId): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (error) {
      // If the record does not exist return undefined
      if (error.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      // Throw all the errors by default
      throw error;
    }
  }
}
