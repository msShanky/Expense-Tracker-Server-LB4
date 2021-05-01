import { authenticate, TokenService } from '@loopback/authentication';
import { Credentials, TokenServiceBindings } from '@loopback/authentication-jwt';
import { inject } from '@loopback/context';
import { service } from '@loopback/core';
import { repository } from '@loopback/repository';
import { get, post, requestBody } from '@loopback/rest';
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

export class UserController {
  constructor(
    @repository(UserAccountRepository) protected userRepo: UserAccountRepository,
    @repository(UserCredentialsRepository) protected userCredentialsRepo: UserCredentialsRepository,
    @service(CustomUserService) public userService: CustomUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
    @inject(SecurityBindings.USER, { optional: true }) public user: UserProfile,
  ) {}

  @post('/login', { responses: LoginResponse })
  async login(@requestBody(LoginRequestBody) credentials: Credentials): Promise<{ token: string }> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    return { token };
  }

  @authenticate('jwt')
  @get('/whoAmI', { responses: WhoAmIResponse })
  async whoAmI(@inject(SecurityBindings.USER) currentUser: UserProfile): Promise<string> {
    console.log(currentUser, 'THE CURRENT USER PROFILE IS');
    return currentUser[securityId];
  }

  @post('/register', { responses: RegisterResponse })
  async register(@requestBody(RegisterRequestBody) newUserRequest: NewUserRequest): Promise<UserAccount> {
    console.log('Request body for the new user registration', newUserRequest);
    const { password, ...otherParams } = newUserRequest;
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    console.log('The hashed password is', hashedPassword);
    const savedUser = await this.userRepo.create(otherParams);
    console.log('SAVED USER ID', savedUser);
    // await this.userRepo.userCredentials(savedUser.userId).create({ userPassword: hashedPassword });
    await this.userCredentialsRepo.create({ userPassword: hashedPassword, userId: savedUser.userId });
    return savedUser;
  }
}
