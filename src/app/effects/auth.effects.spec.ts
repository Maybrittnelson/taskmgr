import { EffectsRunner, EffectsTestingModule} from '@ngrx/effects/testing';
import {Observable} from 'rxjs/Observable';
import {fakeAsync, TestBed} from '@angular/core/testing';
import {AuthEffects} from './auth.effects';
import {AuthService} from '../services/auth.service';
import * as actions from '../actions/auth.action';

describe('测试 AuthEffects', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [
        EffectsTestingModule,
      ],
      providers: [
        AuthEffects,
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('authService', ['login', 'register'])
        }
      ]
  }));

  function setup(methodName: string, params: {returnedAuth: any}) {
    const authService = TestBed.get(AuthService);
    if (params) {
      if (methodName === 'login') {
        authService.login.and.returnValue(params.returnedAuth);
      } else {
        authService.register.and.returnValue(params.returnedAuth);
      }
    }
    return {
      runner: TestBed.get(EffectsRunner),
      authEffects: TestBed.get(AuthEffects)
    };
  }
  it('登录成功发送 LoginSuccessAction', fakeAsync(() => {
    const auth = {
      token: '',
      user: {
        id: '123abc',
        name: 'wang',
        email: 'wang@163.com'
      }
    };
    const {runner, authEffects} = setup('login', {returnedAuth: Observable.of(auth)});
    const expectedResult = new actions.LoginSuccessAction(auth);
    runner.queue(new actions.LoginAction({email: 'wang@dev.local', password: '123abc'}));
    authEffects.login$.subscribe(_result => expect(_result).toEqual(expectedResult));
  }));
});
