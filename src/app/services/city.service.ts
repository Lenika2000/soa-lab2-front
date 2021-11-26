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
    return this.http.get(`${environment.service1url}api/cities`, {headers: CityService.getHeaders(), params: filterData});
  }

  addCity(city: City): Observable<any> {
    this.changeCityBeforeSend(city);
    return this.http.post(`${environment.service1url}api/cities`, city);
  }

  updateCity(city: City): Observable<any> {
    this.changeCityBeforeSend(city);
    return this.http.put(`${environment.service1url}api/cities/${city.id}`, city);
  }

  deleteCityById(id: number): Observable<any> {
    return this.http.delete(`${environment.service1url}api/cities/${id}`);
  }

  getCitiesByName(name: string): Observable<any> {
    return this.http.get(`${environment.service1url}api/cities?name=${name}`);
  }

  getCitiesByMetersAboveSeaLevel(meters: number): Observable<any> {
    return this.http.get(`${environment.service1url}api/cities?meters-above-sea-level=${meters}`);
  }

  getUniqueMetersAboveSeaLevel(): Observable<any> {
    return this.http.get(`${environment.service1url}api/cities/meters-above-sea-level`);
  }

  calculateToLargest(name: string): Observable<any> {
    return this.http.get(`${environment.service2url}api/route/calculate/to-largest?from=${name}`);
  }

  calculateToMinPopulated(): Observable<any> {
    return this.http.get(`${environment.service2url}api/route/calculate/to-min-populated`);
  }

  changeCityBeforeSend(city: City): void {
    Object.keys(city.governor).forEach((k) => city.governor[k] == null && delete city.governor[k]);
    Object.keys(city).forEach((k) => city[k] == null && delete city[k]);
  }
}
