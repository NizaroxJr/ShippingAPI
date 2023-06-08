import { Component, OnInit, Input } from '@angular/core';
import * as rootReducers from '../../reducers/index';
import * as UserActions from '../../actions/user.action';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  hasAdminRole: boolean;
  hasCustomerRole: boolean;
  hasEmployeeRole: boolean;
  @Input() active: string;

  constructor(
    private store: Store<rootReducers.AppState>,
  ) { }

  ngOnInit() {
    this.store.pipe(select('user')).subscribe(data => {
      if (data.current_user) {
        this.currentUser = data.current_user;

        if (data.current_user.roles && data.current_user.roles.has('ADMIN')) {
          this.hasAdminRole = true;
        }
      }
    })
  }

  setActive(tab: string) {
    return {
      'active': this.active === tab,
      'font-weight-bold': this.active === tab
    }
  }

  logout() {
    this.store.dispatch(UserActions.LOG_OUT());
  }

}
