import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer} from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';
import * as authActions from '../actions/auth.action';

import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import * as fromProject from './project.reducer';
import * as fromTaskList from './task-list.reducer';
import * as fromTask from './task.reducer';
import * as fromUser from './user.reducer';

import { environment } from '../../environments/environment';
import {Auth} from '../domain/auth.model';

export interface State {
  quote: fromQuote.State;
  auth: Auth;
  projects: fromProject.State;
  taskLists: fromTaskList.State;
  tasks: fromTask.State;
  users: fromUser.State;
}

const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState,
  projects: fromProject.initialState,
  taskLists: fromTaskList.initialState,
  tasks: fromTask.initialState,
  users: fromUser.initialState,
};

const reducers = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
  projects: fromProject.reducer,
  taskLists: fromTaskList.reducer,
  tasks: fromTask.reducer,
  users: fromUser.reducer,
};

/* 作为全局的reducers */
const productionReducers: ActionReducer<State> = combineReducers(reducers);
/* compose add storeFreeze as parameter to combinResucers */
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

/* 根据开发环境不同返回不同的 reducers*/
export function reducer(state = initialState, action: any): State {
  return action.type === authActions.ActionTypes.LOGOUT ?
    initialState :
    environment.production ?
      productionReducers(state, action) :
      developmentReducers(state, action);
}

export const getQuoteSate = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;
export const getProjectState = (state: State) => state.projects;
export const getTaskListState = (state: State) => state.taskLists;
export const getTaskState = (state: State) => state.tasks;
export const getUserState = (state: State) => state.users;


export const getQuote = createSelector(getQuoteSate, fromQuote.getQuote);
export const getProjects = createSelector(getProjectState, fromProject.getAll);
export const getTaskLists = createSelector(getTaskListState, fromTaskList.getSelected);
export const getTasks = createSelector(getTaskState, fromTask.getTasks);
export const getUsers = createSelector(getUserState, fromUser.getUsers);

export const getUserEntities = createSelector(getUserState, fromUser.getEntities);
export const getTasksWithOwners = createSelector(getTasks, getUserEntities, (tasks, userEntities) => {
  return tasks.map(task => {
    return {
      ...task,
      owner: userEntities[task.ownerId],
      participantIds: task.participantIds.map(id => userEntities[id])
    };
  });
});

export const getTaskByLists = createSelector(getTaskLists, getTasksWithOwners, (lists, tasks) => {
  return lists.map(list => {
    return {
      ...list,
      tasks: tasks.filter(task => task.taskListId === list.id)
    };
  });
});

export const getProjectUsers = (projectId: string) => createSelector(getProjectState, getUserEntities, (state, entities) => {
  return state.entities[projectId].members.map(id => entities[id]);
})
@NgModule({
    imports: [
        StoreModule.provideStore(reducer),
        RouterStoreModule.connectRouter(),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ]
})
export class AppStoreModule {}
