import * as actions from '../actions/task.action';
import * as prjActions from '../actions/project.action';
import {Project} from '../domain/project.model';
import * as _ from 'lodash';
import { createSelector } from 'reselect';
import {covertArrToObj} from '../utils/reduer.util';
import {Task} from '../domain/task.model';

export interface State {
  ids: string[];
  entities: {[id: string]: Task};
}

export const initialState: State = {
  ids: [],
  entities: {},
};

const addTask = (state, action) => {
  const taskList = action.payload;
  if (state.entities[taskList.id]) {
    return state;
  }
  console.log(taskList);
  const newIds = [...state.ids, taskList.id];
  const newEntities = {...state.entities, [taskList.id]: taskList};
  return {...state, ids: newIds, entities: newEntities};
};

const moveAllTasks = (state, action) => {
  const tasks = <Task[]>action.payload;
  const updatedEntities = tasks.reduce((entities, task) => ({...entities, [task.id]: task}), {})
  return {
    ...state,
    entities: {...state.entities, ...updatedEntities}
  }
}


const delByPrj = (state, action) => {
  const project = <Project>action.payload;
  const taskListIds = project.taskLists;
  const remainingIds = state.ids.filter(id => taskListIds.indexOf(state.entities[id].taskListId) === -1);
  const remainingEntities = remainingIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {});
  return {
    ids: [...remainingIds],
    entities: remainingEntities,
  };
};
const updateTask = (state, action) => {
  const taskList = action.payload;
  const newEntities = {...state.entities, [taskList.id]: taskList};
  console.log(newEntities);
  return {...state, entities: newEntities};
};

const delTask = (state, action) => {
  const taskList = action.payload;
  const newIds = state.ids.filter(id => id !== taskList.id);
  const newEntities = newIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {});
  return {
    ids: newIds,
    entities: newEntities,
  };
};

const loadTasks = (state, action) => {
  const tasks = action.payload;
  // if tasks is null then return the orginal state
  if (tasks === null) {
    return state;
  }
  const newTasks = tasks.filter(taskList => !state.entities[taskList.id]);
  const newIds = newTasks.map(taskList => taskList.id);
  if (newTasks.length === 0) {
    return state;
  }
  const newEntities = covertArrToObj(newTasks);
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
  };
};


export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addTask(state, action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return delTask(state, action);
    }
    case actions.ActionTypes.COMPLETE_SUCCESS:
    case actions.ActionTypes.MOVE_SUCCESS:
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateTask(state, action);
    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      return loadTasks(state, action);
    }
    case actions.ActionTypes.MOVE_ALL_SUCCESS: {
      return moveAllTasks(state, action);
    }
    case prjActions.ActionTypes.DELETE_SUCCESS: {
      return delByPrj(state, action);
    }
    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;

export const getTasks = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
});
