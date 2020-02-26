import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authorized: boolean = false
  
  constructor(public router: Router, public auth: AuthService) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      await this.auth.isAuthenticated().then(authorized => { this.authorized = authorized })
      if(!this.authorized) { this.router.navigate(['/login']) }
      return this.authorized
  }
  
}