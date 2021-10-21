import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-pass-link',
  templateUrl: './reset-pass-link.component.html',
  styleUrls: ['./reset-pass-link.component.css']
})
export class ResetPassLinkComponent implements OnInit {

  constructor(private common:CommonService,private auth:LoginService,private router: Router) { }

  emailaddress:any;
  isLoad=false;
  isLogin = false;

  
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

  resetLink(){
    console.log(this.emailaddress);
    if((this.emailaddress !== "") && (this.emailaddress != null)){
      this.isLoad = true;
      let req = {
        email : this.emailaddress
      }
      
      this.auth.sendPasswordResetLink(req).subscribe((data)=>{
        if(data.status){
          this.isLoad = false;
          this.common.successMessage(data.message)
        }else{
          this.isLoad = false;
          this.common.errorMessage(data.message);
        }
      })
    }
    else{
      this.common.warn("Please Enter Email Address")
    }
  }
}
