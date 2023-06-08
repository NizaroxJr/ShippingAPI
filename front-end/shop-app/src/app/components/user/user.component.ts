import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import * as UserActions from '../../actions/user.action';
import { NgxSpinnerService } from "ngx-spinner";
import * as actionTypes from '../../actions/types.action';
import { UserDetailsService } from 'src/app/services/user-details.service';
import * as AdminActions from '../../actions/admin.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  current_user: User;
  users_list: User[] = [];
  addBtn_show: boolean = true;

  /**
   * FOR SIDE EFFECTS
   */
  // current action type
  current_actionType: string;

  // list of action types
  DELETE_USER_SUCCESS: string = actionTypes.DELETE_USER_SUCCESS;
  DELETE_USER_FAILURE: string = actionTypes.DELETE_USER_FAILURE;

  // Delete user message
  deleteUser_successMsg: string;
  deleteUser_errorMsg: string;

  constructor(
    private store: Store<rootReducers.AppState>,
    private spinner: NgxSpinnerService,
    private userDetailsService: UserDetailsService
  ) { }

  ngOnInit() {
    this.store.dispatch(UserActions.LOAD_USERS());

    this.store.pipe(select('type')).subscribe(type => {
      this.current_actionType = type;
    })

    this.store.pipe(select('user')).subscribe(res => {
      // message stuff
      this.deleteUser_successMsg = res.deleteUser_successMsg;
      this.deleteUser_errorMsg = res.deleteUser_errorMsg;

      this.current_user = res.current_user;
      this.users_list = res.allUsers;

      if (res.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    })
  }

  onViewUserDetails(user: User) {
    this.userDetailsService.setViewUser(user);
  }

  onAdd() {
    this.addBtn_show = false;
  }

  cancelAdd() {
    this.addBtn_show = true;
  }

  onDelete(user) {
    const payload = {
      email: user.email,
      current_user: this.current_user
    }
    this.store.dispatch(UserActions.DELETE_USER({ payload: payload }));
  }

  addUser(user: any) {
    this.store.dispatch(AdminActions.ADMIN_ADD_USER({ payload: user }));
  }

}
