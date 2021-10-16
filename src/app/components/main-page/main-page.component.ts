import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {CityService} from '../../services/city.service';
import {City} from '../../model/City';
import {AddOrUpdateCityFormComponent} from '../add-or-update-city-form/add-or-update-city-form.component';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {

  public cities = [];
  private onDestroy = new ReplaySubject(1);

  constructor(private dialog: MatDialog,
              private cityService: CityService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getAllCities();
  }

  updateCity(city: City): void {
    const dialogRef = this.openAddUpdateDialog(false, city);
    dialogRef.componentInstance.cityUpdate.pipe(
      takeUntil(this.onDestroy)
    ).subscribe((updatedCity) => {
      this.cityService.updateCity(updatedCity).pipe(
        takeUntil(this.onDestroy)
      ).subscribe(() => {
        this.getAllCities();
      });
    });
  }

  openAddUpdateDialog(isAddOperation: boolean, city: City): MatDialogRef<AddOrUpdateCityFormComponent, any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      city,
      isAddOperation
    };
    return this.dialog.open(AddOrUpdateCityFormComponent, dialogConfig);
  }

  addCity(): void {
    const dialogRef = this.openAddUpdateDialog(true, null);
    dialogRef.componentInstance.cityAdd.pipe(
      takeUntil(this.onDestroy)
    ).subscribe((newCity) => {
      this.cityService.addCity(newCity).pipe(
        takeUntil(this.onDestroy)
      ).subscribe(() => {
        this.getAllCities();
      });
    });
  }

  deleteCity(id: number): void {
    this.cityService.deleteCityById(id).pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => {
      this.getAllCities();
    });
  }

  getAllCities(): void {
    this.cityService.getCities().pipe(
      takeUntil(this.onDestroy)
    ).subscribe((cities: City[]) => {
      this.cities = cities;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next(1);
    this.onDestroy.complete();
  }

}
