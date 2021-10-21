import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-un-authrised',
  templateUrl: './un-authrised.component.html',
  styleUrls: ['./un-authrised.component.css']
})
export class UnAuthrisedComponent implements OnInit {

  constructor(private common:CommonService,private router:Router) { }

  ngOnInit(): void {
  }


}
