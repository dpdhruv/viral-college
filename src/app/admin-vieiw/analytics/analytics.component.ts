import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { NgxSpinnerService } from 'ngx-spinner'
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  public analytics;
  public loading=true;
  public showCharts=false;
  public doughnutChartLabels = ['Total Users', 'Users by referrals'];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';
  private donutColors = [
    {
      backgroundColor: [
        '#cc3743',
        '#ccc',
      ]
    }
  ];

  public couponChartLabels=["Coupons created for users","Coupons used by users"];
  public couponChartData = [];

  constructor(private spinner:NgxSpinnerService,private _backend: BackendService) {
    //this.spinner.show();

    this._backend.analytics().subscribe(res => {
      this.analytics = res.analytics;
      console.log(this.analytics)
      this.loading=false;
      this.doughnutChartData = [this.analytics.Total_user, this.analytics.Total_Referrals];
      this.couponChartData = [this.analytics.Total_User_coupons,this.analytics.Total_coupons_used_by_users];
      //this.spinner.hide();
    }, err => {
      console.log(err);
      //this.spinner.hide();
      this.loading = false;
      alert("Something went wrong!!!");
    });
  }

  ngOnInit() {
  }

}
