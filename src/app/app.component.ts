import { CommonService } from './services/common.service';
import { Component } from '@angular/core';
import { EventEmitterService } from './services/event-emitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testproject-app';
  isLoggedIn:boolean=false;
  isPrint:boolean=false;
  constructor(private common:CommonService,private eventService: EventEmitterService){}

  ngOnInit(): void {

    this.eventService.layoutOff.subscribe(() => {    
      this.headerOff();
    });

    this.eventService.layoutOn.subscribe(() => {    
      this.headerOn();
    });


    if(this.common.isLoggedIn()){
      this.isLoggedIn = true;
      this.eventService.printOn.subscribe(() => {    
        this.printOn();
      });

    }else{
      this.isLoggedIn = false;
    }

  }

  headerOff(){
    this.isLoggedIn = false;
  }

  printOn(){
    this.isPrint = true;
  }

  headerOn(){
    this.isLoggedIn = true;
  }
  



  

}


