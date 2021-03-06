import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import * as actions from '../actions/auth.action';
import {AuthService} from "../services/auth.service";
import {User} from "../domain/user.model";

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private service$: AuthService) {}

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN)
    .map(toPayload)
    .switchMap(({email, password}) => this.service$.login(email, password)
    .map(auth => new actions.LoginSuccessAction(auth))
    .catch(err => Observable.of(new actions.LoginFailAction(JSON.stringify(err))))
    );

  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER)
    .map(toPayload)
    .switchMap((user: User) => this.service$.register(user)
      .map(auth => new actions.RegisterSuccessAction(auth))
      .catch(err => Observable.of(new actions.RegisterFailAction(JSON.stringify(err))))
    );

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGOUT)
    .map(_ => go(['/']));


  @Effect()
  loginAndNavigate$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN_SUCCESS)
    .map(_ => go(['/projects']));

  @Effect()
  registerAndNavigate$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER_SUCCESS)
    .map(_ => go(['/projects']));

}
