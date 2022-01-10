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
    return this.http.get(`${environment.serviceUrl}api/cities`, {headers: CityService.getHeaders(), params: filterData});
  }

  addCity(city: City): Observable<any> {
    this.changeCityBeforeSend(city);
    return this.http.post(`${environment.serviceUrl}api/cities`, city);
  }

  updateCity(city: City): Observable<any> {
    console.log(city)
    this.changeCityBeforeSend(city);
    return this.http.put(`${environment.serviceUrl}api/cities/${city.id}`, city);
  }

  deleteCityById(id: number): Observable<any> {
    return this.http.delete(`${environment.serviceUrl}api/cities/${id}`);
  }

  getCitiesByName(name: string): Observable<any> {
    return this.http.get(`${environment.serviceUrl}api/cities/filter?byname=${name}`);
  }

  getCitiesByMetersAboveSeaLevel(meters: number): Observable<any> {
    return this.http.get(`${environment.serviceUrl}api/cities/filter?meters-above-sea-level=${meters}`);
  }

  getUniqueMetersAboveSeaLevel(): Observable<any> {
    return this.http.get(`${environment.serviceUrl}api/cities/meters-above-sea-level`);
  }

  calculateToLargest(name: string): Observable<any> {
    return this.http.get(`${environment.serviceUrl}api/route/calculate/to-largest?from=${name}`);
  }

  calculateToMinPopulated(): Observable<any> {
    return this.http.get(`${environment.serviceUrl}api/route/calculate/to-min-populated`);
  }

  changeCityBeforeSend(city: City): void {
    Object.keys(city.governor).forEach((k) => city.governor[k] == null && delete city.governor[k]);
    Object.keys(city).forEach((k) => city[k] == null && delete city[k]);
  }
}
