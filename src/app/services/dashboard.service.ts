import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { CommonService } from "./common.service";


@Injectable({
    providedIn: 'root'
  })
export class DashboardService {
    
    constructor(private common:CommonService,private http:HttpClient){}

    private DashboardChartsURL = this.common.baseUrl + '/products/dashboard/';
    private DashboardBarChartCityURL = this.common.baseUrl + '/products/dashboard-barchart/';

    getDashboardChart(userId: any) {
        return this.http.get(this.DashboardChartsURL + userId, this.common.getHttpHeaders())
        .pipe(
            catchError(this.common.handleError<any>('Dashboard Charts',{}))
        );
    }

    getDashboardCityCharts(userId: number,cityId:number) {
        return this.http.get(this.DashboardBarChartCityURL + userId + '/city/' + cityId,  this.common.getHttpHeaders())
        .pipe(
            catchError(this.common.handleError<any>('Dashboard Charts',{}))
        );
    }

}
