import { Injectable } from '@angular/core';
import { Router,  CanActivate,  ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) {}


  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    // console.log(this.router.url);


    const expectedRole = route.data.expectedRole;
    // console.log(expectedRole)
    const token = localStorage.getItem('sessionToken');
    // decode the token to get its payload
    let tokenPayload:any = decode(token)
    // console.log(tokenPayload);

    if (!this.auth.isAuthenticated() || tokenPayload.role !== 1) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
