import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
          

    constructor(private common:CommonService,private http:HttpClient){}

    private loginUrl =  this.common.baseUrl + '/login';
    private registerUrl =  this.common.baseUrl + '/register';
    private checkSessionUrl =  this.common.baseUrl + '/users/checklogin';
    private checkUserNameURL = this.common.baseUrl + '/checkusername/';
    private ResetPasswordLinkURL = this.common.baseUrl + '/resetPasswordLink/';
    private ResetPasswordURL = this.common.baseUrl + '/resetPassword'

    checkUserName(username: string) {
      if(username.length > 0){
        return this.http.get(this.checkUserNameURL + username)
        .pipe(
          catchError(this.common.handleError<any>('Session Invalid',{}))
        );
      }

    }

    sendPasswordResetLink(request:any) {
      return this.http.post(this.ResetPasswordLinkURL,request)
      .pipe(
        catchError(this.common.handleError<any>('Password Reset link',{}))
      );
    }

    resetPassword(req: any) {
      return this.http.post(this.ResetPasswordURL,req)
      .pipe(
        catchError(this.common.handleError<any>('Password Reset',{}))
      );
    }
    
  

    loginUser(request: any) {
      return this.http.post(this.loginUrl,request);
    }

    register(request: any) {
      return this.http.post(this.registerUrl,request);
    }

    checklogin(){
      return this.http.get(this.checkSessionUrl, this.common.getHttpHeaders())
      .pipe(
        catchError(this.common.handleError<any>('Session Invalid',{}))
      );
    }

}