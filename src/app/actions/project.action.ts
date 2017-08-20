import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import {Auth} from '../domain/auth.model';
import {User} from '../domain/user.model';
import {Project} from '../domain/project.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  ADD:           type('[Project] Add'),
  ADD_SUCCESS:   type('[Project] Add SUCCESS'),
  ADD_FAIL:      type('[Project] Add Fail'),
  UPDATE:           type('[Project] Upate'),
  UPDATE_SUCCESS:   type('[Project] Upate SUCCESS'),
  UPDATE_FAIL:      type('[Project] Upate Fail'),
  DELETE:           type('[Project] Delete'),
  DELETE_SUCCESS:   type('[Project] Delete SUCCESS'),
  DELETE_FAIL:      type('[Project] Delete Fail'),
  LOAD:           type('[Project] Load'),
  LOAD_SUCCESS:   type('[Project] Load SUCCESS'),
  LOAD_FAIL:      type('[Project] Load Fail'),
  INVITE:           type('[Project] Invite'),
  INVITE_SUCCESS:   type('[Project] Invite SUCCESS'),
  INVITE_FAIL:      type('[Project] Invite Fail'),
  SELECT_PROJECT: type('[Project] Select Project'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: Project) { }
}

export class AddSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: Project) { }
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

  constructor(public payload: Project) { }
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

  constructor(public payload: Project) { }
}

export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: Project) { }
}

export class DeleteFailAction implements Action {
  type = ActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: null) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Project[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}


export class InviteAction implements Action {
  type = ActionTypes.INVITE;

  constructor(public payload: {projectId: string; members: User[]}) { }
}

export class InviteSuccessAction implements Action {
  type = ActionTypes.INVITE_SUCCESS;

  constructor(public payload: Project) { }
}

export class InviteFailAction implements Action {
  type = ActionTypes.INVITE_FAIL;

  constructor(public payload: string) { }
}

export class SelectAction implements Action {
  type = ActionTypes.SELECT_PROJECT;

  constructor(public payload: Project) {}
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
  | SelectAction
  | InviteAction
  | InviteSuccessAction
  | InviteFailAction
  ;
