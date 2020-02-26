import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  template: '<h1>logout...</h1>'
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService) { }
  ngOnInit() { this.authService.logout() }
}
