import { Consignment } from "../models/Consignment.model";
import { createReducer, on } from "@ngrx/store";
import * as ConsignmentActions from '../actions/consignment.action';
import { User } from '../models/User.model';

export interface ConsignmentState {
  consignments: {
    notReceived: Consignment[],
    received: Consignment[],
    assigned: Consignment[],
    user: User
  };
  loading: boolean;

  // Load consignments Message
  loadConsignments_successMsg: string;
  loadConsignments_errorMsg: string;

  // Add consignments
  addConsignment_successMsg: string;
  addConsignment_errorMsg: string;
}

const initialState = {
  consignments: {
    notReceived: [],
    received: [],
    assigned: [],
    user: null
  },
  loading: false,

  // Load consignments Message
  loadConsignments_successMsg: null,
  loadConsignments_errorMsg: null,

  // Add consignments
  addConsignment_successMsg: null,
  addConsignment_errorMsg: null
}

const _consignmentReducer = createReducer(initialState,
  on(ConsignmentActions.LOAD_CONSIGNMENTS, (state, action) => {
    return {
      ...state,
      loading: true,
      loadConsignments_successMsg: null,
      loadConsignments_errorMsg: null
    }
  }),
  on(ConsignmentActions.LOAD_CONSIGNMENTS_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false,
      consignments: action.payload.consignments,
      loadConsignments_successMsg: action.payload.success_msg,
      loadConsignments_errorMsg: null
    }
  }),
  on(ConsignmentActions.LOAD_CONSIGNMENTS_FAILURE, (state, action) => {
    return {
      ...state,
      loading: false,
      loadConsignments_successMsg: null,
      loadConsignments_errorMsg: action.payload
    }
  }),
  on(ConsignmentActions.ADD_CONSIGNMENT, (state, action) => {
    return {
      ...state,
      loading: true,
      addConsignment_successMsg: null,
      addConsignment_errorMsg: null
    }
  }),
  on(ConsignmentActions.ADD_CONSIGNMENT_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false,
      addConsignment_successMsg: action.payload.success_msg,
      addConsignment_errorMsg: null,
      consignments: {
        ...state.consignments,
        notReceived: [{ ...action.payload.consignment, received: false }, ...state.consignments['notReceived']],
        user: action.payload.user
      }
    }
  }),
  on(ConsignmentActions.ADD_CONSIGNMENT_FAILURE, (state, action) => {
    return {
      ...state,
      loading: false,
      addConsignment_successMsg: null,
      addConsignment_errorMsg: action.payload
    }
  }),
  on(ConsignmentActions.DELIVER_CONSIGNMENT, (state, action) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(ConsignmentActions.DELIVER_CONSIGNMENT_SUCCESS, (state, action) => {
    const index = [...state.consignments.assigned].findIndex(assigned => assigned.id === action.payload.consignment.id);
    const assigned = [...state.consignments.assigned.slice(0, index), { ...action.payload.consignment }, ...state.consignments.assigned.slice(index + 1)];

    return {
      ...state,
      loading: false,
      consignments: {
        ...state.consignments,
        assigned: assigned,
        user: action.payload.user
      }
    }
  }),
  on(ConsignmentActions.DELIVER_CONSIGNMENT_FAILED, (state, action) => {
    return {
      ...state,
      loading: false
    }
  })
)

export function consignmentReducer(state, action) {
  return _consignmentReducer(state, action);
}