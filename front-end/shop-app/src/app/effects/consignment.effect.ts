import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConsignmentService } from '../services/consignment.service';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ConsignmentActions from '../actions/consignment.action';
import * as TypeActions from '../actions/defineType.action';
import * as actionTypes from '../actions/types.action';

@Injectable()
export class ConsignmentEffects {
  constructor(
    private actions$: Actions,
    private consignmentService: ConsignmentService
  ) { }

  // load all consignments
  loadConsignments = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsignmentActions.LOAD_CONSIGNMENTS),
      mergeMap((data) => {
        // console.log(data)
        return this.consignmentService.getAllConsignments(data.payload.email).pipe(
          // tap(consignments => console.log(consignments)),
          switchMap(consignments => {
            // console.log(consignments);
            return [
              ConsignmentActions.LOAD_CONSIGNMENTS_SUCCESS({
                payload: {
                  consignments: { ...consignments, user: data.payload },
                  success_msg: null
                }
              }),
              TypeActions.SET_TYPE({ actionType: actionTypes.LOAD_CONSIGNMENTS_SUCCESS })
            ]
          }),
          catchError(errs => {
            return of(
              ConsignmentActions.LOAD_CONSIGNMENTS_FAILURE({ payload: 'Error occurred while loading consignments' }),
              TypeActions.SET_TYPE({ actionType: actionTypes.LOAD_CONSIGNMENTS_FAILURE })
            )
          })
        )
      })
    )
  )

  // add consignment
  addConsignment = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsignmentActions.ADD_CONSIGNMENT),
      // tap(data => console.log(data)),
      mergeMap(data => {
        return this.consignmentService.addConsignment(data.payload).pipe(
          // tap(res => console.log(res)),
          switchMap(() => [
            ConsignmentActions.ADD_CONSIGNMENT_SUCCESS({
              payload: {
                user: data.payload.user,
                consignment: data.payload.consignment,
                success_msg: 'Your consignment has been sent'
              }
            }),
            TypeActions.SET_TYPE({ actionType: actionTypes.ADD_CONSIGNMENT_SUCCESS })
          ]),
          catchError(errs => {
            return of(
              ConsignmentActions.ADD_CONSIGNMENT_FAILURE({ payload: 'Please fill out all fields' }),
              TypeActions.SET_TYPE({ actionType: actionTypes.ADD_CONSIGNMENT_FAILURE })
            )
          })
        )
      })
    )
  )

  deliverConsignment = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsignmentActions.DELIVER_CONSIGNMENT),
      mergeMap(data => this.consignmentService.deliverConsignment(data.payload)),
      switchMap(res => [ConsignmentActions.DELIVER_CONSIGNMENT_SUCCESS({ payload: res })]),
      catchError(errs => {
        return of(ConsignmentActions.DELIVER_CONSIGNMENT_FAILED())
      })
    )
  )

}