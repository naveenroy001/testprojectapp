import { Component, OnInit, Injectable, ViewChild, ElementRef, Input } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor() {}
  @Input() msg:string = "";

  ngOnInit(): void {}



}
