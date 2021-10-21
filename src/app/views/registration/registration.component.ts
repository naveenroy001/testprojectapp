import { CommonService } from 'src/app/services/common.service';
import { User } from 'src/app/models/User';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { catchError } from 'rxjs/operators';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private common:CommonService,private auth:LoginService,private router: Router,private eventEmitterService:EventEmitterService) { }

  isLogin=true;
  isLoad=false;

  @ViewChildren("required") requires;
  @ViewChild("username") username;

  user:User = new User();
  password:string;
  conpass:string;

  checkUserName(){
    this.auth.checkUserName(this.user.username).subscribe((data)=>{
      if(data.status){
        this.common.successMessage(data.message);
        this.username.nativeElement.setAttribute('style', 'border:2px solid #73B77C;background-color:#F8EDEB');
      }
      else{
        this.common.warn(data.message);
        this.username.nativeElement.setAttribute('style', 'border:2px solid #F8B1BC;background-color:#F8EDEB');
      }
    })
  }

  validate(){
    var error=0;
    if(!this.common.validateElements(this.requires)) error++;
    if(this.password !== this.conpass) {
      this.common.warn("Password and Confirm Password is not matching");
      error++;
    }

    if(!this.common.validateEmail(this.user.email)){
      this.common.warn("Invalid email address entered");
      error++;
    }
    
    if(error == 0) return true;
    return false;
  }

  register(){
    console.log(this.user);
    if(this.validate()){
      let user = {
        "name": this.user.name,
        "username": this.user.username,
        "email": this.user.email,
        "password": this.password,
        "company_name": this.user.company_name,
        "gst_no": this.user.gst_no
      }
      this.auth.register(user)
      .pipe(
        catchError(this.handleRegisterError<any>('Login',{}))
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
  }

  
  ngOnInit(): void {
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

  
  public handleRegisterError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

        this.common.errorMessage(error); // log to console instead
        this.common.errorMessage(`${operation} failed: ${error.message}`);
        this.isLoad = false;
      
      // Let the app keep running by returning an empty result.

      return of(result as T);
    };
  }
}

