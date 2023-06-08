import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as actionTypes from '../../actions/types.action';
import { select, Store } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {
  @Input('add_clicked') add_clicked: boolean;
  @Output() cancelAdd: EventEmitter<any> = new EventEmitter();
  @Output() addEvent: EventEmitter<any> = new EventEmitter();

  /**
     * FOR SIDE EFFECTS
     */
  // current action type
  current_actionType: string;

  // list of action types
  ADMIN_ADD_USER_SUCCESS: string = actionTypes.ADMIN_ADD_USER_SUCCESS;
  ADMIN_ADD_USER_FAILED: string = actionTypes.ADMIN_ADD_USER_FAILED;

  // Admin Add user message
  adminAddUser_successMsg: string;
  adminAddUser_errorMsg: string[];

  constructor(
    private store: Store<rootReducers.AppState>
  ) { }

  ngOnInit() {
    this.store.pipe(select('type')).subscribe(type => {
      this.current_actionType = type;
    })

    this.store.pipe(select('user')).subscribe(res => {
      this.adminAddUser_successMsg = res.adminAddUser_successMsg;
      this.adminAddUser_errorMsg = res.adminAddUser_errorMsg;
    })
  }

  onCancel() {
    this.cancelAdd.emit();
  }

  onAddUser(
    firstName: string,
    lastName: string,
    email: string,
    role: any
  ) {
    this.addEvent.emit({
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role
    });
  }
}
