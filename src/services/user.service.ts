import { UserService } from '@loopback/authentication';
import { BindingScope, injectable } from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { compare } from 'bcryptjs';
import { UserAccount, UserAccountWithRelations, UserCredentials } from '../models';
import { UserAccountRepository, UserCredentialsRepository } from '../repositories';

export type Credentials = {
  email: string;
  password: string;
};

type UserCredentialsReturnType = UserCredentials | undefined | null;

@injectable({ scope: BindingScope.TRANSIENT })
export class CustomUserService implements UserService<UserAccount, Credentials> {
  constructor(
    @repository(UserAccountRepository) public userRepo: UserAccountRepository,
    @repository(UserCredentialsRepository) public userCredentialsRepo: UserCredentialsRepository,
  ) {}

  public async findCredentials(userId: typeof UserAccount.prototype.userId): Promise<UserCredentialsReturnType> {
    console.log('The user Id to find is', userId);

    try {
      return this.userCredentialsRepo.findOne({
        where: {
          userId,
        },
      });
    } catch (error) {
      // If the record does not exist return undefined
      if (error.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      // Throw all the errors by default
      throw error;
    }
  }

  /*
   * Add service methods here
   */

  async verifyCredentials(credentials: Credentials): Promise<UserAccount> {
    const invalidCredentialsError = 'Invalid email or password.';
    console.log('THE CREDENTIALS RECEIVED FOR VALIDATING IS', credentials);

    const foundUser = await this.userRepo.findOne({
      where: { email: credentials.email },
    });

    console.log('USER EMAIL FOUND IS', foundUser);

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const credentialsFound = await this.findCredentials(foundUser.userId);
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(credentials.password, credentialsFound.userPassword);

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user: UserAccount): UserProfile {
    const { lastName, firstName, userName, email, emailVerified, lastLogin } = user;
    return {
      [securityId]: user.userId.toString(),
      lastName,
      firstName,
      userName,
      email,
      emailVerified,
      lastLogin,
    };
  }

  //function to find user by id
  async findUserById(id: number): Promise<UserAccount & UserAccountWithRelations> {
    const userNotfound = 'invalid User';
    const foundUser = await this.userRepo.findOne({
      where: { userId: id },
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(userNotfound);
    }
    return foundUser;
  }
}
