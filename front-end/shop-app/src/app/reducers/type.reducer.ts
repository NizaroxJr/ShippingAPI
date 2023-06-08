import { createReducer, on } from '@ngrx/store';
import * as DefineTypeActions from '../actions/defineType.action';

const initialstate = '';

const _typeReducer = createReducer(initialstate,
  on(DefineTypeActions.SET_TYPE, (state, action) => {
    return action.actionType
  }),
  on(DefineTypeActions.CLEAR_TYPE, (state, action) => {
    return '';
  })
)

export function typeReducer(state, action) {
  return _typeReducer(state, action);
}