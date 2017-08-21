import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import {User} from '../domain/user.model';
import {Project} from "../domain/project.model";


export interface UserProject {
  user: User;
  projectId: string;
}
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  ADD:           type('[User] Add User Project'),
  ADD_SUCCESS:   type('[User] Add User Project SUCCESS'),
  ADD_FAIL:      type('[User] Add User Project Fail'),
  UPDATE:           type('[User] Upate User Project'),
  UPDATE_SUCCESS:   type('[User] Upate User Project SUCCESS'),
  UPDATE_FAIL:      type('[User] Upate User Project Fail'),
  DELETE:           type('[User] Delete User Project'),
  DELETE_SUCCESS:   type('[User] Delete User Project SUCCESS'),
  DELETE_FAIL:      type('[User] Delete User Project Fail'),
  LOAD:           type('[User] Load Users By Projects'),
  LOAD_SUCCESS:   type('[User] Load Users By Projects SUCCESS'),
  LOAD_FAIL:      type('[User] Load Users By Projects Fail'),
  SEARCH:           type('[User] Search'),
  SEARCH_SUCCESS:   type('[User] Search SUCCESS'),
  SEARCH_FAIL:      type('[User] Search Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: UserProject) { }
}

export class AddSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: User) { }
}

export class AddFailAction implements Action {
  type = ActionTypes.ADD_FAIL;

  constructor(public payload: string) { }
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: Project) { }
}

export class UpdateSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: User[]) { }
}

export class UpdateFailAction implements Action {
  type = ActionTypes.UPDATE_FAIL;

  constructor(public payload: string) { }
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: UserProject) { }
}

export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: User) { }
}

export class DeleteFailAction implements Action {
  type = ActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: string) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: User[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class SearchAction implements Action {
  type = ActionTypes.SEARCH;

  constructor(public payload: string) { }
}

export class SearchSuccessAction implements Action {
  type = ActionTypes.SEARCH_SUCCESS;

  constructor(public payload: User[]) { }
}

export class SearchFailAction implements Action {
  type = ActionTypes.SEARCH_FAIL;

  constructor(public payload: string) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = AddAction
  | AddSuccessAction
  | AddFailAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | SearchAction
  | SearchSuccessAction
  | SearchFailAction;
