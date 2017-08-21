import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import * as actions from '../actions/task.action';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import {TaskService} from '../services/task.service';

@Injectable()
export class TaskEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service$: TaskService) {}

  @Effect()
  loginTasks$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .switchMap((taskLists) => this.service$.getByLists(taskLists)
      .map(tasks => new actions.LoadSuccessAction(tasks))
      .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
    );

  @Effect()
  addTask$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .switchMap((task) =>
      this.service$.add(task)
        .map(t => new actions.AddSuccessAction(t))
        .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err))))
    );

  @Effect()
  updateTasks$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap((task) => this.service$.update(task)
      .map(t => new actions.UpdateSuccessAction(t))
      .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))
    );


  @Effect()
  delTasks$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap((task) => this.service$.del(task)
      .map(t => new actions.DeleteSuccessAction(t))
      .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  complete$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.COMPLETE)
    .map(toPayload)
    .switchMap((task) => this.service$.complete(task)
      .map(t => new actions.DeleteSuccessAction(t))
      .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  move$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.MOVE)
    .map(toPayload)
    .switchMap(({taskId, taskListId}) => this.service$.move(taskId, taskListId)
      .map(task => new actions.MoveSuccessAction(task))
      .catch(err => Observable.of(new actions.MoveFailAction(JSON.stringify(err))))
    );

  @Effect()
  moveAll$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.MOVE_ALL)
    .map(toPayload)
    .switchMap(({srcListId, targetListId}) => this.service$.moveAll(srcListId, targetListId)
      .map(tasks => new actions.MoveAllSuccessAction(tasks))
      .catch(err => Observable.of(new actions.MoveAllFailAction(JSON.stringify(err))))
    );

}
