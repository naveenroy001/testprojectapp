import { CommonService } from 'src/app/services/common.service';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboard:DashboardService,private common:CommonService) { }
  cityId=0;
  cities:any[] = [];

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [];


  
  chartType = 'PieChart';
  chartData = [];
  myOptions = {
    title: '',
    colors: ['#FF4069', '#FF9020', '#059BFF', '#22CFCF', '#FFC234'],
    pieHole: 0.4,
    legend :{
      position: 'top',maxLines : 2
    }
  };

  ngOnInit():void{
    this.getDashboardCharts();
  }


  getDashboardCharts(){
    this.dashboard.getDashboardChart(this.common.getUser().id).subscribe((data)=>{
      if(data.status){
        this.cities = data.result.cities;
        this.setBarChartData(data.result.bargraph);
        this.setDonutChart(data.result.donut);
      }else{
        this.common.errorMessage(data.message);
      }
    })
  }
  
  getDashboardCityCharts(){
    this.dashboard.getDashboardCityCharts(this.common.getUser().id,this.cityId).subscribe((data)=>{
      if(data.status){
        this.setBarChartData(data.result);
      }else{
        this.common.errorMessage(data.message);
      }
    })
  }




  setBarChartData(bargraph:any[]){
    this.barChartLabels = [];
    this.barChartData = [];
    let data1 = [];
    let data2 = [];
    bargraph.forEach((itm)=>{
      this.barChartLabels.push(itm.product_name);
      data1.push(itm.target_revenue);
      data2.push(itm.actual_revenue);
    });

    let target = {
      data: data1, 
      label: 'Target'
    }
    let actual = {
      data: data2, 
      label: 'Actual'
    }
    this.barChartData.push(target);
    this.barChartData.push(actual);
  }


 setDonutChart(donut:any[]){
    let array = [];
    this.chartData = [];
    donut.forEach((itm)=>{
      array = [itm.product_name,itm.revenue];
      this.chartData.push(array);
    })
 }

}
