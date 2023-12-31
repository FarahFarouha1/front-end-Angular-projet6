import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'MesPatients';
  

  constructor (public authService: AuthService ,private router: Router) {}

 
  onLogout() {
   
  
this.authService.logout();}

ngOnInit () {
  this.authService.loadToken();
if (this.authService.getToken()==null ||
 this.authService.isTokenExpired())
this.router.navigate(['/login']);
  }
  


}
