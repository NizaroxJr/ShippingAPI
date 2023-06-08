import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import * as ConsignmentActions from '../../actions/consignment.action';
import { NgxSpinnerService } from "ngx-spinner";
import { Consignment } from 'src/app/models/Consignment.model';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-consignments',
  templateUrl: './consignments.component.html',
  styleUrls: ['./consignments.component.css']
})
export class ConsignmentsComponent implements OnInit {
  current_user: User;
  consignments: {
    notReceived: Consignment[],
    received: Consignment[],
    assigned: Consignment[],
    user: User
  };
  addBtn_show: boolean = true;

  constructor(
    private store: Store<rootReducers.AppState>,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.store.pipe(select('user')).subscribe(res => {
      this.current_user = res.current_user;
      if (res.current_user) {
        this.store.dispatch(ConsignmentActions.LOAD_CONSIGNMENTS({
          payload: {
            email: res.current_user.email,
            firstName: res.current_user.firstName,
            lastName: res.current_user.lastName
          }
        }));
      }
    })

    this.store.pipe(select('consignment')).subscribe(res => {
      console.log(res.consignments);
      this.consignments = res.consignments;

      if (res.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    })
  }

  onAdd(consignment: any) {
    const payload = {
      user: this.current_user,
      consignment: consignment
    }
    this.store.dispatch(ConsignmentActions.ADD_CONSIGNMENT({ payload: payload }));
  }

  onDeliver(assigned_consignment: Consignment) {
    this.store.dispatch(ConsignmentActions.DELIVER_CONSIGNMENT({
      payload: {
        assigned_consignment: assigned_consignment,
        employee: this.current_user
      }
    }))
  }

  onAddBtnClick() {
    this.addBtn_show = false;
  }

  cancelAdd() {
    this.addBtn_show = true;
  }

}
