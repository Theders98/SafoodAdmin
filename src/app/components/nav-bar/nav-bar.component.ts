import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
  user: User

  constructor(private authService: AuthService) { }
  ngOnInit() { this.getUser() }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user
    })
  }

}
