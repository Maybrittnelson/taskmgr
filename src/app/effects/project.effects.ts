import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import * as actions from '../actions/project.action';
import {AuthService} from '../services/auth.service';
import {User} from '../domain/user.model';
import {ProjectService} from '../services/project.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as listActions from '../actions/task-list.action';

@Injectable()
export class ProjectEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service$: ProjectService) {}

  @Effect()
  loginProjects$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState))
    .switchMap(([_, auth]) => this.service$.get(auth.userId)
      .map(projects => new actions.LoadSuccessAction(projects))
      .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
    );

  @Effect()
  addProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState))
    .switchMap(([project, auth]) => {
      const added = {...project, members: [`${auth.userId}`]};
      return this.service$.add(added)
        .map(projects => new actions.AddSuccessAction(projects))
        .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err))));
    }
    );

  @Effect()
  updateProjects$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap((project) => this.service$.update(project)
      .map(projects => new actions.UpdateSuccessAction(projects))
      .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))
    );


  @Effect()
  delProjects$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap((project) => this.service$.del(project)
      .map(projects => new actions.DeleteSuccessAction(projects))
      .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  selectProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SELECT_PROJECT)
    .map(toPayload)
    .map(project => go([`/tasklists/${project.id}`]));

  @Effect()
  loadTaskLists$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SELECT_PROJECT)
    .map(toPayload)
    .map(project => new listActions.LoadAction(project.id));

  @Effect()
  invite: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.INVITE)
    .map(toPayload)
    .switchMap(({projectId, memebers}) => this.service$.invite(projectId, memebers)
      .map(project => new actions.InviteSuccessAction(project))
      .catch(err => Observable.of(new actions.InviteFailAction(JSON.stringify(err))))
    );

}
