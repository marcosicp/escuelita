import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard2 implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      // logged in so return true
      const isUndef = localStorage.getItem('userEscuelita');
      
      try {
        if(isUndef !== 'undefined'){
          const _user = JSON.parse(localStorage.getItem('userEscuelita'));
          if (_user['email']) {
            // this.router.navigate(['/']);
            // return true;
          } else {
            this.router.navigate(['/login'], {
              queryParams: { returnUrl: state.url },
            });
            return false;
          }
        }else {
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
        
      } catch (error) {
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
      }

      // this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
    }
  }
}
