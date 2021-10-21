import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor( private eventEmitterService: EventEmitterService ) {
    this.checkThemeMode();
   }

  nightMode=false;

  ngOnInit(): void {
    this.eventEmitterService.nightModeOn.subscribe(() => {    
      this.nightModeOn();    
    });

    this.eventEmitterService.nightModeOff.subscribe(() => {    
      this.nightModeOff();    
    });  

    



    $(document).ready(function(){
      

      if($(window).width() > 992){

        var sideNavWidth = $('.side-nav').width();
        // $('.content-footer').css('width', windowWidth - sideNavWidth);
        // $('.content-footer').css('position','fixed');
        // $('.content-footer').css('bottom','0');
        // if($(".main-content").height() > windowHeight-200){
        //   $('.content-footer').css('position','relative');
        //   $('.content-footer').css('bottom','none');
        // }


        $('.side-nav-toggle').click(function(){
          if($('.side-nav').hasClass('sm-menu')){
            $('.side-nav-logo').attr('style','');
            $('.logo-dark').attr('style','background-image: url("assets/images/logo/logo.png")');
            $('.side-nav').width(280);
            $('.header').css('margin-left','280px');
            $('.arrow').css('display','block');
            $('.nav-right').css('margin-right','280px');
            $('.content-footer').css('margin-left','280px');
            $('.dropdown-menu.active').css('display','block !important');
            $('.side-nav').removeClass('sm-menu');
            $('.main-content').css('margin-left','300px');
          }
          else{
            $('.side-nav').width(64);
            $('.side-nav-logo').attr('style','background-image: url("assets/images/logo/logo-sm.png");background-repeat:no-repeat');
            $('.logo-dark').attr('style','');
            $('.header').css('margin-left','64px');
            $('.arrow').css('display','none');
            $('.nav-right').css('margin-right','64px');
            $('.content-footer').css('margin-left','70px');
            $('.dropdown-menu.active').css('display','none !important');
            $('.side-nav').addClass('sm-menu');
            $('.main-content').css('margin-left','70px');
            $('.dropdown-menu').css('display','none');
          }
        });

        $('.side-nav').hover(function(){
          if($('.side-nav').hasClass('sm-menu')){
            $('.side-nav').width(280);
            $('.side-nav-logo').attr('style','');
            $('.logo-dark').attr('style','background-image: url("assets/images/logo/logo.png")');
            $('.arrow').css('display','block');
            $('.arrow').css('margin-top','-35px');
            $('.inner-dropdown .arrow').css('margin-top','-28px');
            $('.dropdown-menu.active').css('display','block !important');
          }
        });

        $('.side-nav').mouseleave(function(){
          if($('.side-nav').hasClass('sm-menu')){
            $('.side-nav-logo').attr('style','background-image: url("assets/images/logo/logo-sm.png");background-repeat:no-repeat');
            $('.logo-dark').attr('style','');
            $('.side-nav').width(64);
            $('.arrow').css('display','none');
            $('.dropdown-menu.active').css('display','none !important');
            // $('.dropdown-menu').css('display','none');
          }
        });

        
      }
      else{
        $('.side-nav').css('width','0');
        $('.side-nav-toggle').click(function(){
          $('.side-nav').css('width','280px');
          $('.arrow').css('display','block');
          $('.arrow').css('margin-top','-35px');
          $('.dropdown-menu.active').css('display','block !important');
        });

        $('.mobile-toggle').click(function(){
          $('.side-nav').css('width','0');
          $('.arrow').css('display','block');
          $('.arrow').css('margin-top','-35px');
          $('.dropdown-menu.active').css('display','block !important');
        });
      }

      $('.side-nav-menu .dropdown-toggle').click(function(){
        var arrowelement = $(this).find('.arrow');
        var dropdown = $(this).closest('.dropdown').find('.dropdown-menu');
        if(dropdown.hasClass('active')){
          dropdown.hide('fast');
          arrowelement.find('.ti-angle-down').addClass('ti-angle-right');
          arrowelement.find('.ti-angle-down').removeClass('ti-angle-down');
          dropdown.removeClass('active');
        }
        else{
          dropdown.show('fast');
          arrowelement.find('.ti-angle-right').addClass('ti-angle-down');
          arrowelement.find('.ti-angle-right').removeClass('ti-angle-right');
          dropdown.addClass('active');
        }
      });

      $('.dropdown.inner-dropdown').click(function(){
        if($(this).hasClass("active")){
          $(this).find('.ti-angle-down').addClass('ti-angle-right');
          $(this).find('.ti-angle-down').removeClass('ti-angle-down');
          $(this).find('.dropdown-menu').hide('fast');
          $(this).removeClass("active");
        }else{
          $(this).addClass("active");
          $(this).find('.ti-angle-right').addClass('ti-angle-down');
          $(this).find('.ti-angle-right').removeClass('ti-angle-right');
          $(this).find('.dropdown-menu').show('fast');
        }
        
      });


    });

    $( window ).resize(function() {
      if($( window ).width() > 992){
        $('.side-nav').css('width','280px');
      }
      else{
        $('.side-nav').css('width','0');
        
      }
    });
  }

  checkThemeMode(){
    if(localStorage.getItem("NIGHT") !== null){
      this.nightMode = true;
    }
  }


  nightModeOn(){
    this.nightMode = true;
    localStorage.setItem("NIGHT","ON");
  }

  nightModeOff(){
    this.nightMode = false;
    localStorage.removeItem("NIGHT");
  }





}
