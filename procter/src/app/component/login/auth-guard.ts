import { Injectable } from '@angular/core';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { AuthService, UserState } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuardService implements CanActivate {
  
    constructor(private router: Router,
                private socialAuthService: AuthService) {
    }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.socialAuthService.currentSession.pipe(
        map((socialUser: UserState) => !!socialUser.username),
        tap((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.router.navigate(['login']);
          }
        })
      );
    }
  }