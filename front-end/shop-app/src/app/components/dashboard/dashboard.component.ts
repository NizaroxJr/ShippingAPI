import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import * as UserActions from '../../actions/user.action';
import { NgxSpinnerService } from "ngx-spinner";
import { User } from 'src/app/models/User.model';
import * as actionTypes from '../../actions/types.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /**
   * FOR SIDE EFFECTS
   */
  // current action type
  current_actionType: string;

  // list of action types
  LOG_IN_SUCCESS: string = actionTypes.LOG_IN_SUCCESS;
  EDIT_USER_SUCCESS: string = actionTypes.EDIT_USER_SUCCESS;
  EDIT_USER_FAILURE: string = actionTypes.EDIT_USER_FAILURE;

  // success and error message
  login_successMsg: string;
  editUser_successMsg: string;
  editUser_errors: string[];

  firstNameTitle: string;
  lastNameTitle: string;
  email: string;
  current_user: User;

  constructor(
    private store: Store<rootReducers.AppState>,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.store.pipe(select('type')).subscribe(type => {
      this.current_actionType = type;
    })

    this.store.pipe(select('user')).subscribe(res => {
      this.login_successMsg = res.login_successMsg;
      this.editUser_successMsg = res.editUser_successMsg;
      this.editUser_errors = res.editUser_errors;
      this.current_user = res.current_user;

      if (res.current_user) {
        this.firstNameTitle = res.current_user.firstName;
        this.lastNameTitle = res.current_user.lastName;
        this.email = res.current_user.email;
      }

      if (res.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }

    })
  }

  onUpdate = (firstName: string, lastName: string) => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: this.email,
      roles: this.current_user === null || typeof this.current_user === 'undefined' ? [] : [...this.current_user.roles]
    }
    this.store.dispatch(UserActions.EDIT_USER({ payload: payload }));
  }

  onDelete = () => {
    const payload = {
      email: this.email,
      current_user: this.current_user
    }
    this.store.dispatch(UserActions.DELETE_USER({ payload: payload }));
  }

}
