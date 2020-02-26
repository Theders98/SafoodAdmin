import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../models/restaurant';
import { Observable } from 'rxjs';
import { config } from 'src/app.config';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  baseUrl: string = `${config.API_URL}/api/restaurants`;

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Array<Restaurant>> {
    return this.http.get<Array<Restaurant>>(`${this.baseUrl}`);
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/${id}`);
  }

  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.baseUrl}`, restaurant);
  }

  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.baseUrl}/${restaurant.id}`, restaurant);
  }

  deleteRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.delete<Restaurant>(`${this.baseUrl}/${restaurant.id}`);
  }
}