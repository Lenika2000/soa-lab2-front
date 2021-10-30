import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CityService} from '../../services/city.service';
import {SnackBarService} from '../../services/snack-bar.service';
import {RouteData} from '../../model/RouteData';

@Component({
  selector: 'app-additional-operation-forms',
  templateUrl: './additional-operation-forms.component.html',
  styleUrls: ['./additional-operation-forms.component.css']
})
export class AdditionalOperationFormsComponent implements OnInit {

  @Output() getCitiesByNameEvent = new EventEmitter<string>();
  @Output() filterByMetersAboveSeaLevel = new EventEmitter<number>();
  public routeLengthToCityWithMaxArea: RouteData;
  public routeLengthToCityWithMinPopulation: RouteData;
  public uniqueMetersAboveSeaLevel = [];
  public cityNameForm = new FormGroup({
    name: new FormControl('')
  });
  public metersAboveSeaLevelFilterForm = new FormGroup({
    metersAboveSeaLevel: new FormControl('')
  });
  public cityNameWithMaxAreaForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private cityService: CityService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
  }

  getCitiesByName(): void {
    this.getCitiesByNameEvent.emit(this.cityNameForm.get('name').value);
  }

  getCitiesByMetersAboveSeaLevel(): void {
    this.filterByMetersAboveSeaLevel.emit(this.metersAboveSeaLevelFilterForm.get('metersAboveSeaLevel').value);
  }

  getUniqueMetersAboveSeaLevel(): void {
    this.cityService.getUniqueMetersAboveSeaLevel()
      .subscribe((meters: number[]) => {
        this.uniqueMetersAboveSeaLevel = meters;
      }, error => {
        if (error.status === 404) {
          this.uniqueMetersAboveSeaLevel = [];
          this.snackBarService.openSnackBar('Unique Meters Above Sea Level not found');
        } else {
          this.snackBarService.openSnackBar(error);
        }
      });
  }

  calculateToLargest(): void {
    this.cityService.calculateToLargest(this.cityNameWithMaxAreaForm.get('name').value)
      .subscribe((routeData: RouteData) => {
        this.routeLengthToCityWithMaxArea = routeData;
      }, error => {
        this.routeLengthToCityWithMaxArea = undefined;
        this.snackBarService.openSnackBar(error.error.message);
      });
  }

  calculateToMinPopulated(): void {
    this.cityService.calculateToMinPopulated()
      .subscribe((routeData: RouteData) => {
        this.routeLengthToCityWithMinPopulation = routeData;
      }, error => {
        this.routeLengthToCityWithMinPopulation = undefined;
        this.snackBarService.openSnackBar(error.error.message);
      });
  }
}
