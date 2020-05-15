import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../Services/dashboard.service';
import { LoginService } from '../Services/login.service';
import { map } from 'rxjs/operators';
import { Order } from '../Model_classes/Order';

@Component({
  selector: 'app-fixed-deposite',
  templateUrl: './fixed-deposite.component.html',
  styleUrls: ['./fixed-deposite.component.css']
  // providers:[DashboardService]
})
export class FixedDepositeComponent implements OnInit {

  stringArr:Order[]=[];
  constructor(private dashboardService:LoginService) { }

  ngOnInit() {


this.dashboardService.getServiceDate().pipe(
   map(function(val){
var list:Order[]=[];
  val.forEach(element => {
  let o=new Order();

    o.CustomerName=element.CustomerName;
    o.IsShipped=element.IsShipped;
    o.OrderID=element.OrderID;
    o.ShipperCity=element.ShipperCity;
list.unshift(o);
  });
   return list;  
   })
)
.subscribe((data:Order[])=>
{this.stringArr=data;}
);
}





}
