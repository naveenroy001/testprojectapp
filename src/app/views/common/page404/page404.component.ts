import { CommonService } from '../../../services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  constructor(private common:CommonService) { }

  ngOnInit(): void {
  }

  goBack(){
    this.common.goBack();
  }

}
