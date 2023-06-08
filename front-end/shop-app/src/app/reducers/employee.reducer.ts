import { createReducer, on } from '@ngrx/store';
import * as AdminActions from '../actions/admin.action';
import { User } from '../models/User.model';

export interface EmployeeState {
  all_employees: User[];
  loading: boolean;
}

const initialstate = {
  all_employees: [],
  loading: false
}

const _employeeReducer = createReducer(initialstate,
  on(AdminActions.LOAD_EMPLOYEES, (state, action) => {
    // console.log(action);
    return {
      ...state,
      loading: true,
    }
  }),
  on(AdminActions.LOAD_EMPLOYEES_SUCCESS, (state, action) => {
    // console.log(action.payload)
    return {
      ...state,
      loading: false,
      all_employees: action.payload
    }
  })
)

export function employeeReducer(state, action) {
  return _employeeReducer(state, action);
}