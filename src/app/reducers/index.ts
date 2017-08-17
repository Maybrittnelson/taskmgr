import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer} from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';

import * as fromQuote from './quote.reducer';

import { environment } from '../../environments/environment';

export interface State {
  quote: fromQuote.State;
};

const initialState: State = {
  quote: fromQuote.initialState,
};

const reducers = {
  quote: fromQuote.reducer,
}

/* 作为全局的reducers */
const productionReducers: ActionReducer<State> = combineReducers(reducers);
/* compose add storeFreeze as parameter to combinResucers */
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

/* 根据开发环境不同返回不同的 reducers*/
export function reducer(state = initialState, action: any): State {
  return environment.production ?  productionReducers(state, action) : developmentReducers(state, action);
}
@NgModule({
    imports: [
        StoreModule.provideStore(reducer),
        RouterStoreModule.connectRouter(),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ]
})
export class AppStoreModule {}
