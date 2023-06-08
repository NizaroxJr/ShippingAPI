import { createAction, props } from '@ngrx/store';
import * as actionTypes from '../actions/types.action';

export const ADMIN_DELETE_USER = createAction(
  actionTypes.ADMIN_DELETE_USER,
  props<{ payload: any }>()
)

export const ADMIN_ADD_USER = createAction(
  actionTypes.ADMIN_ADD_USER,
  props<{ payload: any }>()
)

export const ADMIN_ADD_USER_SUCCESS = createAction(
  actionTypes.ADMIN_ADD_USER_SUCCESS,
  props<{ payload: any }>()
)

export const ADMIN_ADD_USER_FAILED = createAction(
  actionTypes.ADMIN_ADD_USER_FAILED,
  props<{ payload: any }>()
)

export const ADMIN_ASSIGN_EMPLOYEE = createAction(
  actionTypes.ADMIN_ASSIGN_EMPLOYEE,
  props<{ payload: any }>()
)

export const ADMIN_ASSIGN_EMPLOYEE_SUCCESS = createAction(
  actionTypes.ADMIN_ASSIGN_EMPLOYEE_SUCCESS,
  props<{ payload: any }>()
)

export const ADMIN_ASSIGN_EMPLOYEE_FAILED = createAction(
  actionTypes.ADMIN_ASSIGN_EMPLOYEE_FAILED,
  props<{ payload: any }>()
)

export const ADMIN_UNASSIGN_EMPLOYEE = createAction(
  actionTypes.ADMIN_UNASSIGN_EMPLOYEE,
  props<{ payload: any }>()
)

export const ADMIN_UNASSIGN_EMPLOYEE_SUCCESS = createAction(
  actionTypes.ADMIN_UNASSIGN_EMPLOYEE_SUCCESS,
  props<{ payload: any }>()
)

export const ADMIN_UNASSIGN_EMPLOYEE_FAILED = createAction(
  actionTypes.ADMIN_UNASSIGN_EMPLOYEE_FAILED,
  props<{ payload: any }>()
)

export const LOAD_EMPLOYEES = createAction(
  actionTypes.LOAD_EMPLOYEES
)

export const LOAD_EMPLOYEES_SUCCESS = createAction(
  actionTypes.LOAD_EMPLOYEES_SUCCESS,
  props<{ payload: any }>()
)