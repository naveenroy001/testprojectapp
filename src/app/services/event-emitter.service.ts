import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';


@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  nightModeOn = new EventEmitter();  
  nightModeOff = new EventEmitter();    
  layoutOff = new EventEmitter();
  layoutOn = new EventEmitter();
  printOn = new EventEmitter();


  subsVar: Subscription;   
  constructor() { }

  enableNightMode(){
    this.nightModeOn.emit();
  }

  disableNightMode(){
    this.nightModeOff.emit();
  }

  disableLayout(){
    this.layoutOff.emit();
  }
  enableLayout(){
    this.layoutOn.emit();
  }
  enablePrint(){
    this.printOn.emit();
  }




}
