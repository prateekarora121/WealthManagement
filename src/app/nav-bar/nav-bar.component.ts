import { Component, OnInit } from '@angular/core';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  faSearch = faSearch;
  faBell = faBell;
  faUser = faUser;
  constructor(private route:Router,private logServ:LoginService) { }

  ngOnInit() {
  }
onLogout()
{
  localStorage.removeItem("token");
this.logServ.AuthToken="";
  this.route.navigate(['']);

}
}
