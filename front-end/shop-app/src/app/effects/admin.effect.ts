import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AdminActions from '../actions/admin.action';
import { switchMap, catchError, mergeMap, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as rootReducers from '../reducers/index';
import { Store } from '@ngrx/store';
import { AdminService } from '../services/admin.service';
import * as TypeActions from '../actions/defineType.action';
import * as actionTypes from '../actions/types.action';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private store: Store<rootReducers.AppState>,
    private adminService: AdminService
  ) { }

  loadEmployees = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.LOAD_EMPLOYEES),
      switchMap(() => this.adminService.loadAllEmployees()),
      switchMap(employees => [AdminActions.LOAD_EMPLOYEES_SUCCESS({ payload: employees })])
    )
  )

  addUser = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.ADMIN_ADD_USER),
      mergeMap(data => {
        return this.adminService.addUser(data.payload).pipe(
          switchMap((newUser) => {
            // console.log(newUser);
            return [
              AdminActions.ADMIN_ADD_USER_SUCCESS({
                payload: {
                  newUser: { ...newUser },
                  success_msg: 'New user added successfully'
                }
              }),
              TypeActions.SET_TYPE({ actionType: actionTypes.ADMIN_ADD_USER_SUCCESS })
            ]
          }),
          catchError(errs => of(
            AdminActions.ADMIN_ADD_USER_FAILED({
              payload:
                [
                  'Please fill out all fields',
                  'Name CANNOT contain numbers or special characters',
                  'Email must be valid format'
                ]
            }),
            TypeActions.SET_TYPE({ actionType: actionTypes.ADMIN_ADD_USER_FAILED })
          ))
        )
      })
    )
  )

  assignEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.ADMIN_ASSIGN_EMPLOYEE),
      // tap(data => console.log(data.payload)),
      mergeMap(data => this.adminService.assignEmployee(
        data.payload.employeeEmail,
        data.payload.assigned_consignment,
        data.payload.owner_name,
        data.payload.owner_email
      )),
      switchMap(() => this.adminService.loadAllEmployees()),
      switchMap(employees => [AdminActions.LOAD_EMPLOYEES_SUCCESS({ payload: employees })])
    )
  )

  unassignEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.ADMIN_UNASSIGN_EMPLOYEE),
      mergeMap(data => this.adminService.unassignEmployee(
        data.payload.employeeEmail,
        data.payload.assigned_consignment,
        data.payload.owner_name,
        data.payload.owner_email
      )),
      switchMap(() => this.adminService.loadAllEmployees()),
      switchMap(employees => [AdminActions.LOAD_EMPLOYEES_SUCCESS({ payload: employees })])
    )
  )

}