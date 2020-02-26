import { Injectable } from '@angular/core';
import { Allergen } from '../models/allergen';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/app.config';

@Injectable({
  providedIn: 'root'
})
export class AllergensService {
  baseUrl: string = `${config.API_URL}/api/allergens`;

  constructor(private http: HttpClient) { }

  getAllergens(): Observable<Array<Allergen>> {
    return this.http.get<Array<Allergen>>(`${this.baseUrl}`);
  }

  getAllergen(id: number): Observable<Allergen> {
    return this.http.get<Allergen>(`${this.baseUrl}/${id}`);
  }

  createAllergen(allergen: Allergen): Observable<Allergen> {
    return this.http.post<Allergen>(`${this.baseUrl}`, allergen);
  }

  updateAllergen(allergen: Allergen): Observable<Allergen> {
    return this.http.put<Allergen>(`${this.baseUrl}/${allergen.id}`, allergen);
  }

  deleteAllergen(allergen: Allergen): Observable<Allergen> {
    return this.http.delete<Allergen>(`${this.baseUrl}/${allergen.id}`);
  }
}