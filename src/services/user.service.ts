import { UserService } from '@loopback/authentication';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { compare } from 'bcryptjs';
// User --> MyUser
import { UserAccount } from '../models';
import { UserAccountRepository } from '../repositories';

export type Credentials = {
  email: string;
  password: string;
};

// User --> MyUser
export class CustomUserService implements UserService<UserAccount, Credentials> {
  constructor(@repository(UserAccountRepository) public userRepo: UserAccountRepository) {}

  // User --> MyUser
  async verifyCredentials(credentials: Credentials): Promise<UserAccount> {
    const invalidCredentialsError = 'Invalid email or password.';

    const foundUser = await this.userRepo.findOne({
      where: { email: credentials.email },
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const credentialsFound = await this.userRepo.findCredentials(foundUser.id);
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(credentials.password, credentialsFound.password);

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  // User --> MyUser
  convertToUserProfile(user: UserAccount): UserProfile {
    const { lastName, firstName, userName, email, emailVerified, lastLogin, id } = user;

    return {
      [securityId]: id,
      id,
      lastName,
      firstName,
      userName,
      email,
      emailVerified,
      lastLogin,
    };
  }
}
