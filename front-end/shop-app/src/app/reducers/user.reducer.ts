import { createReducer, on } from '@ngrx/store';
import { User } from '../models/User.model';
import * as UserActions from '../actions/user.action';
import * as AdminActions from '../actions/admin.action';

export interface UserState {
  current_user: User;
  allUsers: User[];
  firstNameErrMsg: string;
  lastNameErrMsg: string;
  emailErrMsg: string;
  passwordErrMsg: string;
  confirmPasswordErrMsg: string;
  generalErr: string;
  successMsg: string;
  valid: boolean;
  loading: boolean;

  // Login User Message
  login_successMsg: string;
  login_errorMsg: string;

  // Register User Message
  register_successMsg: string;
  register_errorMsg: string;

  // Logout message
  logout_successMsg: string;

  // Edit User Message
  editUser_successMsg: string;
  editUser_errorMsg: string;
  editUser_errors: string[];

  // Delete User Message
  deleteUser_successMsg: string;
  deleteUser_errorMsg: string;

  // ADMIN add user message
  adminAddUser_successMsg: string;
  adminAddUser_errorMsg: string[];
}

const initialState = {
  current_user: null,
  allUsers: [],
  firstNameErrMsg: undefined,
  lastNameErrMsg: undefined,
  emailErrMsg: undefined,
  passwordErrMsg: undefined,
  confirmPasswordErrMsg: undefined,
  generalErr: undefined,
  successMsg: undefined,
  valid: undefined,
  loading: false,

  // Login User Message
  login_successMsg: null,
  login_errorMsg: null,

  // Register User Message
  register_successMsg: null,
  register_errorMsg: null,

  // Logout message
  logout_successMsg: null,

  // Edit User
  editUser_successMsg: null,
  editUser_errorMsg: null,
  editUser_errors: [],

  // Delete User
  deleteUser_successMsg: null,
  deleteUser_errorMsg: null,

  // ADMIN add user
  adminAddUser_successMsg: null,
  adminAddUser_errorMsg: null
}

const _userReducer = createReducer(initialState,
  on(UserActions.LOAD_USERS, (state, action) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(UserActions.LOAD_USERS_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false,
      allUsers: action.payload
    }
  }),
  on(UserActions.LOAD_USERS_FAILURE, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(UserActions.LOG_IN, (state, action) => {
    return {
      ...state,
      loading: true,
      login_successMsg: null,
      login_errorMsg: null
    }
  }),
  on(UserActions.LOG_IN_SUCCESS, (state, action) => {
    return {
      ...state,
      firstNameErrMsg: null,
      lastNameErrMsg: null,
      emailErrMsg: null,
      passwordErrMsg: null,
      confirmPasswordErrMsg: null,
      generalErr: null,
      successMsg: action.payload.successMsg,
      valid: true,
      loading: false,
      current_user: {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        roles: new Set(action.payload.data.current_user.roles.map(roleObj => roleObj.role)),
        consignments: new Set(action.payload.data.current_user.consignments)
      },
      login_successMsg: action.payload.success_msg,
      login_errorMsg: null
    }
  }),
  on(UserActions.LOG_IN_FAILURE, (state, action) => {
    //console.log(action.payload);
    return {
      ...action.payload.data,
      loading: false,
      login_successMsg: null,
      login_errorMsg: action.payload.error_msg
    }
  }),
  on(UserActions.LOG_OUT_SUCCESS, (state, action) => {
    return {
      ...state,
      logout_successMsg: action.payload
    }
  }),
  on(UserActions.SET_CURRENT_USER, (state, action) => {
    if (action.payload !== null && typeof action.payload !== 'undefined') {
      return {
        ...state,
        current_user: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          roles: new Set(action.payload.roles.map(roleObj => roleObj.role)),
          consignments: new Set(action.payload.consignments)
        }
      }
    }
    return {
      ...state,
      current_user: null
    }
  }),
  on(UserActions.REGISTER, (state, action) => {
    return {
      ...state,
      loading: true,
      register_successMsg: null,
      register_errorMsg: null
    }
  }),
  on(UserActions.REGISTER_SUCCESS, (state, action) => {
    return {
      ...action.payload,
      loading: false,
      register_successMsg: action.payload,
      register_errorMsg: null
    }
  }),
  on(UserActions.REGISTER_FAILURE, (state, action) => {
    //console.log(action.payload);
    return {
      ...action.payload.data,
      loading: false,
      register_successMsg: null,
      register_errorMsg: action.payload.error_msg
    }
  }),
  on(UserActions.EDIT_USER, (state, action) => {
    return {
      ...state,
      loading: true,
      editUser_successMsg: null,
      editUser_errorMsg: null
    }
  }),
  on(UserActions.EDIT_USER_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false,
      editUser_successMsg: action.payload,
      editUser_errorMsg: null,
      editUser_errors: []
    }
  }),
  on(UserActions.EDIT_USER_FAILURE, (state, action) => {
    return {
      ...state,
      loading: false,
      editUser_successMsg: null,
      editUser_errorMsg: null,
      editUser_errors: action.payload
    }
  }),
  on(UserActions.DELETE_USER, (state, action) => {
    return {
      ...state,
      loading: true,
      deleteUser_successMsg: null,
      deleteUser_errorMsg: null
    }
  }),
  on(UserActions.DELETE_USER_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false,
      deleteUser_successMsg: action.payload,
      deleteUser_errorMsg: null
    }
  }),
  on(UserActions.DELETE_USER_FAILURE, (state, action) => {
    return {
      ...state,
      loading: false,
      deleteUser_successMsg: null,
      deleteUser_errorMsg: action.payload
    }
  }),
  on(AdminActions.ADMIN_DELETE_USER, (state, action) => {
    return {
      ...state,
      allUsers: state.allUsers.filter(user => user.email !== action.payload.email),
      loading: true
    }
  }),
  on(AdminActions.ADMIN_ADD_USER, (state, action) => {
    return {
      ...state,
      loading: true,
      adminAddUser_successMsg: null,
      adminAddUser_errorMsg: null
    }
  }),
  on(AdminActions.ADMIN_ADD_USER_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false,
      adminAddUser_successMsg: action.payload.success_msg,
      adminAddUser_errorMsg: null,
      allUsers: [...state.allUsers, action.payload.newUser]
    }
  }),
  on(AdminActions.ADMIN_ADD_USER_FAILED, (state, action) => {
    return {
      ...state,
      loading: false,
      adminAddUser_successMsg: null,
      adminAddUser_errorMsg: action.payload
    }
  })
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}