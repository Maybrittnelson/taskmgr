import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Project} from '../domain';
import {Observable} from 'rxjs/Observable';
import {Auth} from '../domain/auth.model';
import {User} from '../domain/user.model';

@Injectable()
export class AuthService {
  private readonly domain = 'users';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

  /**
   * 构造函数用于注入服务的依赖以及进行必要的初始化
   *
   * @param http 注入Http
   * @param config 注入基础配置
   */
  constructor(private http: Http,
              @Inject('BASE_CONFIG') private config) {
  }

  /**
   * 使用用户提供的个人信息进行注册，成功则返回 User，否则抛出异常
   *
   * @param user 用户信息，id 属性会被忽略，因为服务器端会创建新的 id
   */
  register(user: User): Observable<Auth> {
    user.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'email': user.email}})
      .switchMap(res => {
        if (res.json().length > 0) {
          return Observable.throw('username existed');
        }
        return this.http
          .post(uri, JSON.stringify(user), {headers: this.headers})
          .map(r => ({token: this.token, user: r.json()}));
      });
  }

  /**
   * 使用用户名和密码登录
   *
   * @param email 用户名
   * @param password 密码（明文），服务器会进行加密处理
   */
  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'email': username, 'password': password}})
      .map(res => {
        if (res.json().length === 0) {
          Observable.throw('Username or password incorrect');
        }
        return {
          token: this.token,
          user: res.json()[0]
        };
      });
  }
}

