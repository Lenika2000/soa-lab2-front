import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {CityService} from '../../services/city.service';
import {City} from '../../model/City';
import {AddOrUpdateCityFormComponent} from '../add-or-update-city-form/add-or-update-city-form.component';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';
import {PaginationResult} from '../../model/PaginationResult';
import {SnackBarService} from '../../services/snack-bar.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {

  public cities = [];
  private onDestroy = new ReplaySubject(1);
  public paginationResult: PaginationResult = {
    pageSize: 5,
    pageIndex: 0,
    totalItems: 0,
    list: []
  };
  private selectedFilterData = {
    sort: ['id_asc'],
    size: [5],
    page: [0],
  };

  constructor(private dialog: MatDialog,
              private cityService: CityService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getAllCities(this.selectedFilterData);
  }

  updateCity(city: City): void {
    const dialogRef = this.openAddUpdateDialog(false, city);
    dialogRef.componentInstance.getAllCities.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => {
      this.getAllCities(this.selectedFilterData);
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
    dialogRef.componentInstance.getAllCities.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => {
      this.getAllCities(this.selectedFilterData);
    });
  }

  deleteCity(id: number): void {
    this.cityService.deleteCityById(id).pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => {
      this.getAllCities(this.selectedFilterData);
    }, error => {
        if (error.status === 404) {
          this.snackBarService.openSnackBar(error.error.message);
        }
      }
    );
  }

  getAllCities(filterData): void {
    this.cityService.getCities(filterData).pipe(
      takeUntil(this.onDestroy)
    ).subscribe((paginationResults: PaginationResult) => {
      this.paginationResult = paginationResults;
      if (paginationResults.list === null) {
        this.snackBarService.openSnackBar('Cities not found');
        this.cities = [];
      } else {
        this.cities = paginationResults.list;
      }
    }, (error => {
      this.snackBarService.openSnackBar(error.error.message);
    }));
  }

  filterCities(filterData): void {
    this.selectedFilterData = filterData;
    this.getAllCities(filterData);
  }

  getCitiesByName(name: string): void {
    this.cityService.getCitiesByName(name).pipe(
      takeUntil(this.onDestroy)
    ).subscribe((cities: City[]) => {
      this.cities = cities;
    }, (error => {
      this.getFilterCitiesError(error);
    }));
  }

  getCitiesByMetersAboveSeaLevel(metersAboveSeaLevel: number): void {
    this.cityService.getCitiesByMetersAboveSeaLevel(metersAboveSeaLevel).pipe(
      takeUntil(this.onDestroy)
    ).subscribe((cities: City[]) => {
      this.cities = cities;
      if (this.cities.length === 0) {
        this.snackBarService.openSnackBar('Cities not found');
      }
    }, (error => {
      this.getFilterCitiesError(error);
    }));
  }

  getFilterCitiesError(error: any): void {
    if (error.status === 404) {
      this.cities = [];
      this.snackBarService.openSnackBar(error.error.message);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next(1);
    this.onDestroy.complete();
  }

}
