import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer} from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';

import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import * as fromProject from './project.reducer';

import { environment } from '../../environments/environment';
import {Auth} from '../domain/auth.model';

export interface State {
  quote: fromQuote.State;
  auth: Auth;
  projects: fromProject.State;
}

const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState,
  projects: fromProject.initialState
};

const reducers = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
  projects: fromProject.reducer
};

/* 作为全局的reducers */
const productionReducers: ActionReducer<State> = combineReducers(reducers);
/* compose add storeFreeze as parameter to combinResucers */
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

/* 根据开发环境不同返回不同的 reducers*/
export function reducer(state = initialState, action: any): State {
  return environment.production ?  productionReducers(state, action) : developmentReducers(state, action);
}

export const getQuoteSate = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;
export const getProjectState = (state: State) => state.projects;

export const getQuote = createSelector(getQuoteSate, fromQuote.getQuote);
export const getProjects = createSelector(getProjectState, fromProject.getAll);
@NgModule({
    imports: [
        StoreModule.provideStore(reducer),
        RouterStoreModule.connectRouter(),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ]
})
export class AppStoreModule {}
