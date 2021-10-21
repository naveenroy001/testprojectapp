
import { CommonService } from './../../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

import * as $ from 'jquery';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,private common:CommonService,private eventEmitterService: EventEmitterService) {
  }

  deptId:number;
  userData:User = new User();

  nightMode=false;



  ngOnInit(): void {
    
    
    $(document).ready(function(){
      var toggled = localStorage.getItem("toggled");
      if(toggled === "1"){
        $('#gridClick').trigger("click");
      }
      $('#gridClick').click(function(){

        toggled = localStorage.getItem("toggled");
        if(toggled === null){
          toggled = "1";
          localStorage.setItem("toggled","1");
        }
        else{
          toggled = null;
          localStorage.removeItem("toggled");
        }
      });
    });


    this.checkThemeMode();
    this.userData = this.common.getUser();
  }





  logout(){
    localStorage.clear();
    this.eventEmitterService.disableLayout();
    this.router.navigateByUrl('login');
    this.common.successMessage("Logged out successfully");
    window.location.replace("/");
  }

  enableNightMode(){
    this.eventEmitterService.enableNightMode();
    this.nightMode = true;
  }

  disableNightMode(){
    this.eventEmitterService.disableNightMode();
    this.nightMode = false;
  }
  checkThemeMode(){
    if(localStorage.getItem("NIGHT") !== null){
      this.nightMode = true;
    }
  }



}
