import {Component, OnDestroy, OnInit} from '@angular/core';
import {CityService} from '../../services/city.service';
import {MatTableDataSource} from '@angular/material/table';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';
import {City} from '../../model/City';

@Component({
  selector: 'app-city-table',
  templateUrl: './city-table.component.html',
  styleUrls: ['./city-table.component.css']
})
export class CityTableComponent implements OnInit, OnDestroy {

  public displayedColumns = ['id', 'name', 'x', 'y', 'creationDate', 'area',
    'population', 'metersAboveSeaLevel', 'timezone', 'government', 'standardOfLiving', 'height', 'birthday', 'update', 'delete'];
  public dataSource = new MatTableDataSource<City>();
  private onDestroy = new ReplaySubject(1);
  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.getAllCities();
  }

  getAllCities(): void {
    this.cityService.getCities().pipe(
      takeUntil(this.onDestroy)
    ).subscribe((cities: City[]) => {
      this.dataSource = new MatTableDataSource<City>(cities);
    });
  }

  updateCity(city: City): void {

  }

  deleteCity(city: City): void {
    this.cityService.deleteCityById(city.id).pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => {
      this.getAllCities();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next(1);
    this.onDestroy.complete();
  }

}
