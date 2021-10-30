import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {City} from '../model/City';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) {}

  private static getHeaders(): HttpHeaders {

    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getCities(filterData: any): Observable<any> {
    return this.http.get(`${environment.testUrl}/api/cities`, {headers: CityService.getHeaders(), params: filterData})
      .pipe(
        // tap(this.setToken),
        // catchError(this.handleError.bind(this))
      );
  }

  addCity(city: City): Observable<any> {
    this.changeCityBeforeSend(city);
    return this.http.post(`${environment.testUrl}/api/cities`, city)
      .pipe(
        // tap(this.setToken),
        // catchError(this.handleError.bind(this))
      );
  }

  updateCity(city: City): Observable<any> {
    this.changeCityBeforeSend(city);
    return this.http.put(`${environment.testUrl}/api/cities/${city.id}`, city)
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

  getCitiesByName(name: string): Observable<any> {
    return this.http.get(`${environment.testUrl}/api/cities?name=${name}`)
      .pipe(
        // tap(this.setToken),
        // catchError(this.handleError.bind(this))
      );
  }

  getCitiesByMetersAboveSeaLevel(meters: number): Observable<any> {
    return this.http.get(`${environment.testUrl}/api/cities?meters-above-sea-level=${meters}`)
      .pipe(
        // tap(this.setToken),
        // catchError(this.handleError.bind(this))
      );
  }

  getUniqueMetersAboveSeaLevel(): Observable<any> {
    return this.http.get(`${environment.testUrl}/api/cities/meters-above-sea-level`)
      .pipe(
        // tap(this.setToken),
        // catchError(this.handleError.bind(this))
      );
  }

  changeCityBeforeSend(city: City): void {
    Object.keys(city.governor).forEach((k) => city.governor[k] == null && delete city.governor[k]);
    Object.keys(city).forEach((k) => city[k] == null && delete city[k]);
  }
}
