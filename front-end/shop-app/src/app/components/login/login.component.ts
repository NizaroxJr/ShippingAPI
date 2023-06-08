import { Component, OnInit } from '@angular/core';
import * as UserActions from '../../actions/user.action';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import { User } from '../../models/User.model';
import { NgxSpinnerService } from "ngx-spinner";
import * as actionTypes from '../../actions/types.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  current_user: User;
  passwordErrMsg: string;
  emailErrMsg: string;
  valid: boolean;

  /**
   * FOR SIDE EFFECTS
   */
  // current action type
  current_actionType: string;

  // list of action types
  REGISTER_SUCCESS: string = actionTypes.REGISTER_SUCCESS;
  LOG_OUT_SUCCESS: string = actionTypes.LOG_OUT_SUCCESS;
  DELETE_USER_SUCCESS: string = actionTypes.DELETE_USER_SUCCESS;
  LOG_IN_FAILURE: string = actionTypes.LOG_IN_FAILURE;

  // success and error message
  register_successMsg: string;
  logout_successMsg: string;
  deleteUser_successMsg: string;
  login_errorMsg: string;

  constructor(
    private store: Store<rootReducers.AppState>,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.store.pipe(select('type')).subscribe(type => {
      this.current_actionType = type;
    })

    this.store.pipe(select('user')).subscribe((res) => {
      this.register_successMsg = res.register_successMsg;
      this.logout_successMsg = res.logout_successMsg;
      this.deleteUser_successMsg = res.deleteUser_successMsg;
      this.login_errorMsg = res.login_errorMsg;

      this.current_user = res.current_user;
      this.passwordErrMsg = res.passwordErrMsg;
      this.emailErrMsg = res.emailErrMsg;
      this.valid = res.valid;

      if (res.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    })
  }

  isEmailValid = () => {
    return typeof this.emailErrMsg === 'undefined' || this.emailErrMsg === null;
  }

  isPasswordValid = () => {
    return typeof this.passwordErrMsg === 'undefined' || this.passwordErrMsg === null;
  }

  login = (email, password) => {
    const credentials = {
      email: email,
      password: password
    }
    this.store.dispatch(UserActions.LOG_IN({ payload: credentials }));
  }
}
