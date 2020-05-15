import { Component, OnInit } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private admin:AdminDashboardComponent) {
   }

  ngOnInit() {
this.admin.check();
   // alert("admin");
  }

}
