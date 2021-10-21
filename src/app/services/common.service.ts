import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import {Location} from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  

  private styleTag: HTMLStyleElement;
 
  constructor(private toastr: ToastrService,private router: Router,private location:Location,private titleService: Title,private eventService:EventEmitterService) { 
    this.styleTag = this.buildStyleElement();
  }

  //Local 
  baseUrl = "http://localhost:1000";



  public reloadPage(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  public goBack(){
    this.location.back();
  }

  public getHttpHeaders(){
    let httpHeaders = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem("sessionToken")
      })
    };
    return httpHeaders;
  }

  public getHttpPublicHeaders(){
    let httpHeaders = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };
    return httpHeaders;
  }


  public getUser() : User {
    let user:User =  null;
    if(localStorage.getItem("userdetails")){
      user = JSON.parse(localStorage.getItem("userdetails"));  
    }
    return user;
  }

  public isLoggedIn() : boolean {
    if(localStorage.getItem("sessionToken")){
      return true;
    }
    return false;
  }




  public getToken(){
    if(localStorage.getItem("sessionToken")) return localStorage.getItem("sessionToken");
  }

  public log(message:string){
    this.toastr.info(message);
  }

  public info(message:string){
    this.toastr.info(message);
  }

  public warn(message:string){
    this.toastr.warning(message);
  }

  public errorMessage(message:string){
    if(message.indexOf("$") !== -1)
    {
      this.toastr.error(message.split("$")[0]);
      this.exceptionMessage(message.split("$")[1]);
    }
    else{
      this.toastr.error(message);
    }
  }

  public successMessage(message: any) {
    this.toastr.success(message);
  }


  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(error.status == 401){
        this.toastr.error("Session Expired"); 
        localStorage.clear();
        this.eventService.disableLayout();
        this.router.navigate(['/login']);
      }
      else{
        console.log(error);
        //this.toastr.error(error); // log to console instead
        this.toastr.error(`${operation} failed: ${error.message}`);
      }

      
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  

  public disableBodyScroll() : void {

		document.body.appendChild( this.styleTag );

	}


	// I re-enable the scrolling feature on the main viewport.
	public enableBodyScroll() : void {

		document.body.removeChild( this.styleTag );

  }
  



	// ---
	// PRIVATE METHODS.
	// ---

	// I build and return a Style element that will prevent scrolling on the body.
	private buildStyleElement() : HTMLStyleElement {

		var style = document.createElement( "style" );

		style.type = "text/css";
		style.setAttribute( "data-debug", "Injected by WindowScrolling service." );
		style.textContent = `
			body {
				overflow: hidden !important ;
			}
		`;

		return( style );

  }

  private exceptionMessage(ticket){ 
    Swal.fire({
      icon: 'error',
      title: 'Error processing request',
      text: 'Please note your ticket no ' + ticket,
    })
  }

  public fullSuccessMessage(title,message){
    Swal.fire({
      icon: 'success',
      title: title,
      text: message
    })
  }

  public validateEmail(email){
    const regex = /^\S+@\S+$/;
    return regex.test(email);
  }
  

 
  public fullInfoMessage(title,message){
    Swal.fire(title, message);

  } 

 

  copyObject(obj:any){
    let str = JSON.stringify(obj);
    return JSON.parse(str);
  }


  setDocumentTitle(title:string){
    this.titleService.setTitle(title);
  }



  validateElements(elements:any) {
    let i = 1;
    let error = 0
    elements.toArray().map(
      (element) =>{
        element.nativeElement.setAttribute('name','input-'+i++);
        if(element.nativeElement.value == "" || element.nativeElement.value == null || element.nativeElement.value == 0){
            element.nativeElement.setAttribute('style', 'border:2px solid #F8B1BC;background-color:#F8EDEB');
            error++;
        }
        else{
          element.nativeElement.removeAttribute('style');
        }
      } 
    );

    if(error == 0) return true;
    else  {
      this.warn("Please fill the highlighted fields")
      return false;
    }

  }

  roundToTwoDM(num:number){
    return Math.round((num +Number.EPSILON)*100)/100;
  }
 

  checkYesNo(val){
    return (val === 'Y') ? "Yes" : (val === 'N') ? "No" : "";
  }
  
}
