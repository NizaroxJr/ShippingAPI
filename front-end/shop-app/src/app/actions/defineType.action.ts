import { createAction, props } from '@ngrx/store';
import * as actionTypes from '../actions/types.action';

export const SET_TYPE = createAction(
  actionTypes.SET_TYPE,
  props<{ actionType: string }>()
)

export const CLEAR_TYPE = createAction(
  actionTypes.CLEAR_TYPE
)