import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {City} from '../model/City';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) {}

  addCity(city: City): Observable<any> {
    return this.http.post(`${environment.testUrl}/api/cities`, city)
      .pipe(
        // tap(this.setToken),
        // catchError(this.handleError.bind(this))
      );
  }

  getCities(): Observable<any> {
    return this.http.get(`${environment.testUrl}/api/cities`)
      .pipe(
        // tap(this.setToken),
        // catchError(this.handleError.bind(this))
      );
  }

  deleteCityById(id: number): Observable<any> {
    return this.http.delete(`${environment.testUrl}/api/cities/${id}`)
      .pipe(
        // tap(this.setToken),
        // catchError(this.handleError.bind(this))
      );
  }
}
