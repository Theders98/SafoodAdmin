import * as Cookies from "js-cookie";

import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { config } from 'src/app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authorized: boolean = false

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  public async isAuthenticated(): Promise<boolean> {
    const token: string = this.jwtHelper.tokenGetter()
    const checkToken: boolean = (token != null && !this.jwtHelper.isTokenExpired(token))
    if(!checkToken) { return checkToken }

    const user: User = await this.getUser().toPromise()
    if(user.role) { this.isAuthorized() }
    return this.authorized;
  }

  public getUser(): Observable<User> {
    return this.http.post<User>(`${config.API_URL}/api/auth/me`, null)
  }

  private notAuthorized() {
    this.authorized = false
  }

  private isAuthorized() {
    this.authorized = true
  }

  async login(email: string, password: string) {
    const response = await this.http.post<any>(`${config.API_URL}/api/auth/login`, { email, password }).toPromise();
    Cookies.set('token', response.access_token, { expires: (150.12 / response.expires_in) })
    Cookies.set('token', response.access_token, { domain: config.SITE_URL })
    this.router.navigate(['/'])
  }

  logout() {
    this.http.post<any>(`${config.API_URL}/api/auth/logout`, null).subscribe();
    Cookies.remove('token')
    Cookies.remove('token', { domain: config.SITE_URL })
    this.router.navigate(['/'])
  }
}