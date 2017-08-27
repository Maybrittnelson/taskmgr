import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {BaseResponseOptions, Http, HttpModule, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {User} from "../domain/user.model";

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: 'BASE_CONFIG', useValue: {
          uri: 'http://localhost:3000'
        }},
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseResponseOptions]
        },
        MockBackend,
        BaseResponseOptions,
        AuthService]
    });
  });

  it('注册后应该返回一个Observable<Auth>', inject([AuthService, MockBackend], (service: AuthService, mockBackend: MockBackend) => {
    const mockUser: User = {
      name: 'someuser@dev.local',
      password: '123abc',
      email: 'someuser@dev.local'
    };
    const mockResponse = {
      id: 'obj123abc',
      name: 'someuser@dev.local',
      email: 'someuser@dev.local',
      password: '123abc'
    };
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
      })));
    })
    service.register(mockUser).subscribe(auth => {
      expect(auth.token).toBeDefined();
      expect(auth.user).toBeDefined();
      expect(auth.user.id).toEqual(mockResponse.id);
    });
  }));
});
