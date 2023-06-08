import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import * as rootReducers from '../reducers/index';
import * as UserActions from '../actions/user.action';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store<rootReducers.AppState>
  ) { }

  isAuthenticated = (): Boolean => {
    console.log('CHecking authentication...');
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken === null || typeof jwtToken === 'undefined') {
      return false;
    }

    const isTokenExpired: boolean = jwtHelper.isTokenExpired(jwtToken);
    if (isTokenExpired) {
      localStorage.removeItem('jwtToken');
      this.store.dispatch(UserActions.SET_CURRENT_USER({ payload: null }));
      return false;
    }
    const userInfo = jwtHelper.decodeToken(jwtToken);
    this.store.dispatch(UserActions.GET_CURRENT_USER({ payload: userInfo.sub }));
    return true;
  }
}
