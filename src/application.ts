import { AuthenticationComponent } from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  TokenServiceBindings,
  UserCredentialsRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { RestExplorerBindings, RestExplorerComponent } from '@loopback/rest-explorer';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import { MysqldbDataSource } from './datasources';
import { UserAccountRepository } from './repositories';
import { MySequence } from './sequence';
import { CustomUserService } from './services/user.service';
export { ApplicationConfig };

export class ExpenseTrackerServerApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    // Mount authentication system
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    this.dataSource(MysqldbDataSource, UserServiceBindings.DATASOURCE_NAME);

    this.bind(UserServiceBindings.USER_SERVICE).toClass(CustomUserService);

    this.bind(UserServiceBindings.USER_REPOSITORY).toClass(UserAccountRepository);

    this.bind(UserServiceBindings.USER_CREDENTIALS_REPOSITORY).toClass(UserCredentialsRepository);

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to('3600');

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
