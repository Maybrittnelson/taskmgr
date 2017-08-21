import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import {Auth} from '../domain/auth.model';
import {User} from '../domain/user.model';
import {Task} from '../domain/task.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  ADD:           type('[Task] Add'),
  ADD_SUCCESS:   type('[Task] Add SUCCESS'),
  ADD_FAIL:      type('[Task] Add Fail'),
  UPDATE:           type('[Task] Upate'),
  UPDATE_SUCCESS:   type('[Task] Upate SUCCESS'),
  UPDATE_FAIL:      type('[Task] Upate Fail'),
  DELETE:           type('[Task] Delete'),
  DELETE_SUCCESS:   type('[Task] Delete SUCCESS'),
  DELETE_FAIL:      type('[Task] Delete Fail'),
  LOAD:           type('[Task] Load'),
  LOAD_SUCCESS:   type('[Task] Load SUCCESS'),
  LOAD_FAIL:      type('[Task] Load Fail'),
  MOVE:           type('[Task] Move'),
  MOVE_SUCCESS:   type('[Task] Move SUCCESS'),
  MOVE_FAIL:      type('[Task] Move Fail'),
  MOVE_ALL:           type('[Task] Move All'),
  MOVE_ALL_SUCCESS:   type('[Task] Move All SUCCESS'),
  MOVE_ALL_FAIL:      type('[Task] Move All Fail'),
  COMPLETE:           type('[Task] Complete'),
  COMPLETE_SUCCESS:   type('[Task] Complete SUCCESS'),
  COMPLETE_FAIL:      type('[Task] Complete Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: Task) { }
}

export class AddSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: Task) { }
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

  constructor(public payload: Task) { }
}

export class UpdateSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: Task) { }
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

  constructor(public payload: Task) { }
}

export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: Task) { }
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

  constructor(public payload: Task[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class MoveAction implements Action {
  type = ActionTypes.MOVE;

  constructor(public payload: {taskId: string; targetId: string}) { }
}

export class MoveSuccessAction implements Action {
  type = ActionTypes.MOVE_SUCCESS;

  constructor(public payload: Task) { }
}

export class MoveFailAction implements Action {
  type = ActionTypes.MOVE_FAIL;

  constructor(public payload: string) { }
}

export class MoveAllAction implements Action {
  type = ActionTypes.MOVE_ALL;

  constructor(public payload: {srcListId: string; targetListId: string}) { }
}

export class MoveAllSuccessAction implements Action {
  type = ActionTypes.MOVE_ALL_SUCCESS;

  constructor(public payload: Task[]) { }
}

export class MoveAllFailAction implements Action {
  type = ActionTypes.MOVE_ALL_FAIL;

  constructor(public payload: string) { }
}

export class CompleteAction implements Action {
  type = ActionTypes.COMPLETE;

  constructor(public payload: Task) { }
}

export class CompleteSuccessAction implements Action {
  type = ActionTypes.COMPLETE_SUCCESS;

  constructor(public payload: Task) { }
}

export class CompleteFailAction implements Action {
  type = ActionTypes.COMPLETE_FAIL;

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
  | MoveAction
  | MoveSuccessAction
  | MoveFailAction
  ;
