import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AdminActions from '../actions/admin.action';
import * as UserActions from '../actions/user.action';
import * as TypeActions from '../actions/defineType.action';
import * as actionTypes from '../actions/types.action';
import { mergeMap, map, catchError, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) { }

  loadUsers = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOAD_USERS),
      switchMap(() => {
        return this.userService.getAllUsers().pipe(
          // tap(users => console.log(users)),
          switchMap(users => [
            UserActions.LOAD_USERS_SUCCESS({ payload: users })
          ]),
          catchError(errs => {
            return of(UserActions.LOAD_USERS_FAILURE())
          })
        )
      })
    )
  )

  login = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOG_IN),
      switchMap((data) => {
        return this.userService.logIn(data.payload.email, data.payload.password).pipe(
          tap(res => {
            localStorage.setItem('jwtToken', res.jwtToken);
          }),
          switchMap(res => {
            this.router.navigate([`/dashboard/${res.current_user.firstName}${res.current_user.lastName}`]);
            return [
              UserActions.GET_CURRENT_USER({ payload: res.current_user.email }),
              UserActions.LOG_IN_SUCCESS({
                payload: {
                  data: { ...res },
                  success_msg: 'Welcome! You have logged in successfully'
                }
              }),
              TypeActions.SET_TYPE({ actionType: actionTypes.LOG_IN_SUCCESS })
            ]
          }),
          catchError(errs => {
            return of(
              UserActions.LOG_IN_FAILURE({
                payload:
                {
                  data: { ...errs.error },
                  error_msg: 'Invalid email/password'
                }
              }),
              TypeActions.SET_TYPE({ actionType: actionTypes.LOG_IN_FAILURE })
            );
          })
        )
      })
    )
  )

  register = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.REGISTER),
      switchMap((data) => {
        return this.userService.register(data.payload).pipe(
          switchMap(res => {
            this.router.navigate(['/login']);
            return [
              UserActions.REGISTER_SUCCESS({ payload: 'Your account has been created! You can login now' }),
              TypeActions.SET_TYPE({ actionType: actionTypes.REGISTER_SUCCESS })
            ]
          }),
          catchError(errs => {
            return of(
              UserActions.REGISTER_FAILURE({
                payload: {
                  data: { ...errs.error },
                  error_msg: errs.error.generalErr
                }
              }),
              TypeActions.SET_TYPE({ actionType: actionTypes.REGISTER_FAILURE })
            );
          })
        )
      })
    )
  )

  setCurrentUser = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.GET_CURRENT_USER),
      mergeMap((data) => {
        return this.userService.getCurrentUser(data.payload).pipe(
          map(user => {
            return UserActions.SET_CURRENT_USER({ payload: user });
          })
        )
      })
    )
  )

  logout = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOG_OUT),
      tap(() => {
        localStorage.removeItem('jwtToken');
      }),
      switchMap(() => {
        return [
          UserActions.SET_CURRENT_USER({ payload: null }),
          UserActions.LOG_OUT_SUCCESS({ payload: 'You have logged out' }),
          TypeActions.SET_TYPE({ actionType: actionTypes.LOG_OUT_SUCCESS })
        ]
      })
    )
  )

  editUser = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.EDIT_USER),
      switchMap(data => {
        return this.userService.editUser(data.payload).pipe(
          switchMap(res => [
            UserActions.EDIT_USER_SUCCESS({ payload: 'Your profile has been updated' }),
            UserActions.SET_CURRENT_USER({
              payload: {
                firstName: data.payload.firstName,
                lastName: data.payload.lastName,
                email: data.payload.email,
                roles: data.payload.roles
              }
            }),
            TypeActions.SET_TYPE({ actionType: actionTypes.EDIT_USER_SUCCESS })
          ]),
          catchError(errs => {
            return of(
              UserActions.EDIT_USER_FAILURE({
                payload: [
                  'Names can NOT be blanked',
                  'Invalid name format (should NOT contain numbers or special characters)'
                ]
              }),
              TypeActions.SET_TYPE({ actionType: actionTypes.EDIT_USER_FAILURE })
            )
          })
        )
      })
    )
  )

  deleteUser = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.DELETE_USER),
      mergeMap(data => {
        return this.userService.deleteUser(data.payload.email).pipe(
          tap(res => {
            if (res) {
              if (data.payload.email === data.payload.current_user.email) {
                localStorage.removeItem('jwtToken');
              }
            }
          }),
          switchMap(res => {
            if (data.payload.email === data.payload.current_user.email) {
              this.router.navigate(['/login']);
              return [
                UserActions.SET_CURRENT_USER({ payload: null }),
                UserActions.DELETE_USER_SUCCESS({ payload: 'Your account has been deleted' }),
                TypeActions.SET_TYPE({ actionType: actionTypes.DELETE_USER_SUCCESS })
              ]
            }
            return [
              AdminActions.ADMIN_DELETE_USER({ payload: { email: data.payload.email } }),
              UserActions.DELETE_USER_SUCCESS({ payload: `Account "${data.payload.email}" has been deleted` }),
              TypeActions.SET_TYPE({ actionType: actionTypes.DELETE_USER_SUCCESS })
            ]
          }),
          catchError(errs => {
            return of(
              UserActions.DELETE_USER_FAILURE({ payload: 'Error occurred while deleting this account' }),
              TypeActions.SET_TYPE({ actionType: actionTypes.DELETE_USER_FAILURE })
            )
          })
        )
      })
    )
  )
}
