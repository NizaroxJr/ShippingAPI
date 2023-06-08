import { createAction, props } from '@ngrx/store';
import * as actionTypes from './types.action';

export const LOAD_CONSIGNMENTS = createAction(
  actionTypes.LOAD_CONSIGNMENTS,
  props<{ payload: any }>()
)

export const LOAD_CONSIGNMENTS_SUCCESS = createAction(
  actionTypes.LOAD_CONSIGNMENTS_SUCCESS,
  props<{ payload: any }>()
)

export const LOAD_CONSIGNMENTS_FAILURE = createAction(
  actionTypes.LOAD_CONSIGNMENTS_FAILURE,
  props<{ payload: any }>()
)

export const ADD_CONSIGNMENT = createAction(
  actionTypes.ADD_CONSIGNMENT,
  props<{ payload: any }>()
)

export const ADD_CONSIGNMENT_SUCCESS = createAction(
  actionTypes.ADD_CONSIGNMENT_SUCCESS,
  props<{ payload: any }>()
)

export const ADD_CONSIGNMENT_FAILURE = createAction(
  actionTypes.ADD_CONSIGNMENT_FAILURE,
  props<{ payload: any }>()
)

export const DELIVER_CONSIGNMENT = createAction(
  actionTypes.DELIVER_CONSIGNMENT,
  props<{ payload: any }>()
)

export const DELIVER_CONSIGNMENT_SUCCESS = createAction(
  actionTypes.DELIVER_CONSIGNMENT_SUCCESS,
  props<{ payload: any }>()
)

export const DELIVER_CONSIGNMENT_FAILED = createAction(
  actionTypes.DELIVER_CONSIGNMENT_FAILED,
)