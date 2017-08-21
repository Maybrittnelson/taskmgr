import * as actions from '../actions/task-list.action';
import * as prjActions from '../actions/project.action';
import {Project} from '../domain/project.model';
import * as _ from 'lodash';
import { createSelector } from 'reselect';
import {covertArrToObj} from '../utils/reduer.util';
import {TaskList} from '../domain/task-list.model';

export interface State {
  ids: string[];
  entities: {[id: string]: TaskList};
  selectedIds: string[];
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: [],
};

const addTaskList = (state, action) => {
  const taskList = action.payload;
  if (state.entities[taskList.id]) {
    return state;
  }
  console.log(taskList);
  const newIds = [...state.ids, taskList.id];
  const newEntities = {...state.entities, [taskList.id]: taskList};
  return {...state, ids: newIds, entities: newEntities};
};

const swapTaskLists = (state, action) => {
  const taskLists = <TaskList[]>action.payload;
  const updatedEntities = _.chain(taskLists)
    .keyBy('íd')
    .mapValues(o => o)
    .value();
  const newEntities = {...state.entities, ...updatedEntities};
  return {
    ...state,
    entities: newEntities
  };
};

const selectPrj = (state, action) => {
  const selected = <Project>action.payload;
  const selectedIds = state.ids.filter(id => state.entities[id].projectId === selected.id);
  return {
    ...state,
    selectedIds: selectedIds
  };
};

const delListsByPrj = (state, action) => {
  const project = <Project>action.payload;
  const taskListIds = project.taskLists;
  const remainingIds = _.difference(state.ids, taskListIds);
  const remainingEntities = remainingIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {});
  return {
    ids: [...remainingIds],
    entities: remainingEntities,
    selectedIds: []
  };
};
const updateTaskList = (state, action) => {
  const taskList = action.payload;
  const newEntities = {...state.entities, [taskList.id]: taskList};
  console.log(newEntities);
  return {...state, entities: newEntities};
};

const delTaskList = (state, action) => {
  const taskList = action.payload;
  const newIds = state.ids.filter(id => id !== taskList.id);
  const newEntities = newIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {});
  const newSelectedIds = state.selectedIds.filter(id => id !== taskList.id);
  return {
    ids: newIds,
    entities: newEntities,
    selectedIds: newSelectedIds
  };
};

const loadTaskLists = (state, action) => {
  const taskLists = action.payload;
  // if taskLists is null then return the orginal state
  if (taskLists === null) {
    return state;
  }
  const newTaskLists = taskLists.filter(taskList => !state.entities[taskList.id]);
  const newIds = newTaskLists.map(taskList => taskList.id);
  if (newTaskLists.length === 0) {
    return state;
  }
  const newEntities = covertArrToObj(newTaskLists);
  return {
    ...state,
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
  };
};


export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addTaskList(state, action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return delTaskList(state, action);
    }
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateTaskList(state, action);
    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      return loadTaskLists(state, action);
    }
    case actions.ActionTypes.SWAP_SUCCESS: {
      return swapTaskLists(state, action);
    }
    case prjActions.ActionTypes.SELECT_PROJECT: {
    return selectPrj(state, action);
  }
    case prjActions.ActionTypes.DELETE_SUCCESS: {
      return delListsByPrj(state, action);
    }
    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedIds = (state: State) => state.selectedIds;

export const getSelected = createSelector(getIds, getEntities, (ids, entities) => {
  console.log(ids);
  return ids.map(id => entities[id]);
});
