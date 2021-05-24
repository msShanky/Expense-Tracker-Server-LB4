import { authenticate, TokenService } from '@loopback/authentication';
import { Credentials, TokenServiceBindings, UserServiceBindings } from '@loopback/authentication-jwt';
import { inject } from '@loopback/core';
import { IsolationLevel, repository } from '@loopback/repository';
import { get, HttpErrors, post, requestBody, Response, RestBindings } from '@loopback/rest';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { genSalt, hash } from 'bcryptjs';
import { UserAccount } from '../models';
import { UserAccountRepository, UserCredentialsRepository } from '../repositories';
import { CustomUserService } from '../services';
import {
  LoginRequestBody,
  LoginResponse,
  NewUserRequest,
  RegisterRequestBody,
  RegisterResponse,
  WhoAmIResponse,
} from '../specs/user.specs';

type RegisteredUser = Partial<UserAccount> & {
  token: string;
};

export class UserController {
  constructor(
    @repository(UserAccountRepository) protected userRepo: UserAccountRepository,
    @repository(UserCredentialsRepository) protected userCredentialsRepo: UserCredentialsRepository,
    @inject(UserServiceBindings.USER_SERVICE) private userService: CustomUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
  ) {}

  @post('/login', { responses: LoginResponse })
  async login(@requestBody(LoginRequestBody) credentials: Credentials): Promise<RegisteredUser> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    await this.userRepo.updateById(user.id, { lastLogin: new Date().toUTCString() });
    this.response.cookie('token', token);
    return { ...userProfile, token };
  }

  @authenticate('jwt')
  @get('/me', { responses: WhoAmIResponse })
  async whoAmI(@inject(SecurityBindings.USER) currentUser: UserProfile): Promise<UserAccount | null> {
    const fetchedData = await this.userRepo.findOne({
      where: {
        id: currentUser[securityId],
      },
    });
    if (currentUser[securityId] !== fetchedData?.id) {
      throw new HttpErrors.NotFound('The user is not found');
    }
    return fetchedData;
  }

  @post('/register', { responses: RegisterResponse })
  async register(@requestBody(RegisterRequestBody) newUserRequest: NewUserRequest): Promise<RegisteredUser> {
    const { password, ...otherParams } = newUserRequest;
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const transaction = await this.userRepo.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {
      const savedUser = await this.userRepo.create(
        { ...otherParams, lastLogin: new Date().toLocaleString() },
        { transaction },
      );
      console.log('SAVED USER INFO', savedUser);
      await this.userCredentialsRepo.create({ password: hashedPassword, userId: savedUser.id }, { transaction });
      const userProfile = this.userService.convertToUserProfile(savedUser);
      const token = await this.jwtService.generateToken(userProfile);
      await transaction.commit();
      // TODO: Format the error scenarios for the user if the email is already present in the database
      return { ...savedUser, token };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
