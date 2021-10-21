import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private auth:LoginService,private common:CommonService, private route:ActivatedRoute,private router:Router) { }


  @ViewChildren('required') requires;
  password:any;
  cpassword:any;
  isLoad=false;
  token:string;
  email:string;
  isLogin = false;





  
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get("token");
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

  validate(){
    let error = 0;
    if(!this.common.validateElements(this.requires)) error++;

    if(!this.common.validateEmail(this.email)) {
      error++;
      this.common.warn("Invalid Email address entered");
    }
    if(this.password !== this.cpassword){
      error++;
      this.common.warn("Password and Confirm {assword are not matching");
    }

    if(error == 0) return true;
    return false;
  }



  resetPassword(){
 
    if(this.validate()){
      this.isLoad = true;
      let req = {
        "email" : this.email,
        "password" : this.password,
        "token" : this.token
      }
      this.auth.resetPassword(req).subscribe((data)=>{
        if(data.status){
          this.common.successMessage(data.message);
          this.router.navigateByUrl('/login')
          this.isLoad = false;
        }
        else{
          this.common.errorMessage(data.message);
          this.isLoad = false;
        }
      })
    }
    

  }

}
