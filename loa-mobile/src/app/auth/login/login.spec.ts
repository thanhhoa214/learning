import { TestBed } from '@angular/core/testing';
import { GraphQLModule } from '@loa-mobile/graphql.module';
import { NgxsModule } from '@ngxs/store';
import { LoginService } from './services/login.service';
import { Login } from './store/login.actions';
import { LoginState } from './store/login.state';

const LOGIN_PAYLOADS: { [key: string]: Login['payload'] } = {
  memberSuccessful: {
    isBusiness: false,
    loginInput: {
      email: 'abc@abc.com',
      password: '123123'
    }
  },
  memberFailed: {
    isBusiness: false,
    loginInput: {
      email: 'hoa.nguyen@abc.com',
      password: '123123'
    }
  },
  businessSuccessful: {
    isBusiness: true,
    loginInput: {
      email: 'thanh.pham@abc.com',
      password: '123123'
    }
  },
  businessFailed: {
    isBusiness: true,
    loginInput: {
      email: 'hoa.tran@abc.com',
      password: '123123'
    }
  }
};

describe('[Auth] Login', () => {
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GraphQLModule, NgxsModule.forRoot([LoginState])]
    });

    loginService = TestBed.inject(LoginService);
  });

  it('should login by member successfully.', (done) => {
    loginService.onLoginSuccessful().subscribe(() => {
      expect(loginService.snapshot.token).toBeInstanceOf(String);
      done();
    });
    const { memberSuccessful } = LOGIN_PAYLOADS;
    loginService.login(memberSuccessful.loginInput, memberSuccessful.isBusiness);
  });

  it('should login by member failed.', (done) => {
    loginService.onLoginFailed().subscribe(() => {
      expect(loginService.snapshot.token).toBe(undefined);
      done();
    });
    const { memberFailed } = LOGIN_PAYLOADS;
    loginService.login(memberFailed.loginInput, memberFailed.isBusiness);
  });

  it('should login by business successfully.', (done) => {
    loginService.onLoginSuccessful().subscribe(() => {
      expect(loginService.snapshot.token).toBeInstanceOf(String);
      done();
    });
    const { businessSuccessful } = LOGIN_PAYLOADS;
    loginService.login(businessSuccessful.loginInput, businessSuccessful.isBusiness);
  });

  it('should login by business failed.', (done) => {
    loginService.onLoginFailed().subscribe(() => {
      expect(loginService.snapshot.token).toBe(undefined);
      done();
    });
    const { businessFailed } = LOGIN_PAYLOADS;
    loginService.login(businessFailed.loginInput, businessFailed.isBusiness);
  });
});

describe('[Auth] Logout', () => {
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GraphQLModule, NgxsModule.forRoot([LoginState])]
    });

    loginService = TestBed.inject(LoginService);
  });

  it('should logout successfully.', (done) => {
    loginService.onLogout().subscribe(() => {
      expect(loginService.snapshot.token).toBe(undefined);
      done();
    });
    loginService.logout();
  });
});
