import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import * as actions from '../actions/project.action';
import {AuthService} from '../services/auth.service';
import {User} from '../domain/user.model';
import * as userActions from '../actions/user.action';
import {ProjectService} from '../services/project.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as listActions from '../actions/task-list.action';
import {Project} from "../domain/project.model";

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
    .debug('add')
    .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth => auth.user).debug('auth'))
    .switchMap(([project, user]) => {
      const added = {...project, members: [`${user.id}`]};
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
  invite$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.INVITE)
    .map(toPayload)
    .switchMap(({projectId, memebers}) => this.service$.invite(projectId, memebers)
      .map(project => new actions.InviteSuccessAction(project))
      .catch(err => Observable.of(new actions.InviteFailAction(JSON.stringify(err))))
    );

  @Effect()
  loadUsers$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD_SUCCESS)
    .map(toPayload)
    .switchMap((projects: Project[]) => Observable.from(projects.map(prj => prj.id)))
    .map(projectId => new userActions.LoadAction(projectId));

  @Effect()
  addUserProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD_SUCCESS)
    .map(toPayload)
    .map(project => project.id)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth => auth.user), (projectId, user) => {
      return new userActions.AddAction({user: user, projectId: projectId});
    })


  @Effect()
  removeUserProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE_SUCCESS)
    .map(toPayload)
    .map(project => project.id)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth => auth.user), (projectId, user) => {
      return new userActions.DeleteAction({user: user, projectId: projectId});
    })
  @Effect()
  updateUserProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.INVITE_SUCCESS)
    .map(toPayload)
    .map(project => new userActions.UpdateAction(project));

}
