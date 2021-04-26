import { authenticate, TokenService } from '@loopback/authentication';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import { inject } from '@loopback/context';
import { repository } from '@loopback/repository';
import { get, post, requestBody } from '@loopback/rest';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { genSalt, hash } from 'bcryptjs';
import { NewUser } from '../models';
import {
  LoginRequestBody,
  LoginResponse,
  RegisterRequestBody,
  RegisterResponse,
  WhoAmIResponse,
} from '../specs/user.specs';

export class UserController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
    @inject(UserServiceBindings.USER_SERVICE) public userService: MyUserService,
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
  async register(@requestBody(RegisterRequestBody) newUserRequest: NewUser): Promise<User> {
    console.log('Request body for the new user registration', newUserRequest);
    const { password, ...otherParams } = newUserRequest;
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    console.log('The hashed password is', hashedPassword);
    const savedUser = await this.userRepo.create(otherParams);
    await this.userRepo.userCredentials(savedUser.id).create({ password: hashedPassword });
    return savedUser;
  }
}
