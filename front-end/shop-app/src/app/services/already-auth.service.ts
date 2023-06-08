import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import * as rootReducers from '../reducers/index';
import { Store, select } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AlreadyAuthService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<rootReducers.AppState>
  ) { }

  canActivate() {
    if (this.authService.isAuthenticated()) {
      this.store.pipe(select('user')).subscribe(res => {
        if (res.current_user !== null) {
          this.router.navigate([`/dashboard/${res.current_user.firstName}${res.current_user.lastName}`]);
        }
      })
      return false;
    } else {
      return true;
    }
  }
}