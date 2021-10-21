import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { LoginService } from '../../services/login.service';
import { CommonService } from './../../services/common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  username:string;
  password:string;

  @ViewChild('loginPage') loginPage;
  isLogin = false;

  constructor(private common:CommonService,private auth:LoginService,private router: Router,private eventEmitterService:EventEmitterService) { 
  }

  isLoad = false;

  ngOnInit(): void {
    this.router.navigate([''])
    if(this.common.getUser()){
      this.auth.checklogin().subscribe(
        (data)=> {
          if(data.status){
            this.isLogin = false;
            this.router.navigate(['/dashboard']);
          }
          else{
            this.isLogin = true;
          }
        }
      )
      
    }else{
      this.isLogin = true;
    }
  }



  login(){
    
    if(this.username != "" && this.password!= null){
      this.isLoad = true;
      let request = { 
        "username" : this.username,
        "password" : this.password
      }
      this.auth.loginUser(request)  
      .pipe(
        catchError(this.handleLoginError<any>('Login',{}))
      )
      .subscribe(
        (data)=>{
          if(data.status){
            this.isLoad = false;
            localStorage.setItem("userdetails",JSON.stringify(data.userDetails));
            localStorage.setItem("sessionToken",data._token);
            this.common.successMessage("Logged In successfully");
            this.eventEmitterService.enableLayout();
            this.router.navigate(['/dashboard']);
          }
        }
      );

    }
    else{
      this.common.errorMessage("Enter username and password");
    }
    


  }

  public handleLoginError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(error.status == 401){
        this.common.errorMessage("Invalid Username or Password"); 
        this.router.navigate(['/login']);
        this.isLoad = false;
      }
      else{
        this.common.errorMessage(error); // log to console instead
        this.common.errorMessage(`${operation} failed: ${error.message}`);
        this.isLoad = false;
      }
      // Let the app keep running by returning an empty result.

      return of(result as T);
    };
  }



}
