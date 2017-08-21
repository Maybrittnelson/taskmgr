import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import * as actions from '../actions/task-list.action';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import {TaskListService} from '../services/task-list.service';

@Injectable()
export class TaskListEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service$: TaskListService) {}

  @Effect()
  loginTaskLists$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .switchMap((projectId) => this.service$.get(projectId)
      .map(taskLists => new actions.LoadSuccessAction(taskLists))
      .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
    );

  @Effect()
  addTaskList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .debug('add')
    .switchMap((taskList) =>
       this.service$.add(taskList)
         .map(tl => new actions.AddSuccessAction(tl))
         .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err))))
    );

  @Effect()
  updateTaskLists$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap((taskList) => this.service$.update(taskList)
      .map(tl => new actions.UpdateSuccessAction(tl))
      .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))
    );


  @Effect()
  delTaskLists$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap((taskList) => this.service$.del(taskList)
      .map(tl => new actions.DeleteSuccessAction(tl))
      .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  swap$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SWAP)
    .map(toPayload)
    .switchMap(({src, target}) => this.service$.swapOrder(src, target)
      .map(taskLists => new actions.SwapSuccessAction(taskLists))
      .catch(err => Observable.of(new actions.SwapFailAction(JSON.stringify(err))))
    );

}
