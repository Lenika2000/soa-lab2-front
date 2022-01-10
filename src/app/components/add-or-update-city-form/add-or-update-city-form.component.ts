import {Component, Inject, Input, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Government} from '../../model/Government';
import {StandardOfLiving} from '../../model/StandardOfLiving';
import {City} from '../../model/City';
import {Coordinates} from '../../model/Coordinates';
import {Human} from '../../model/Human';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {CityService} from '../../services/city.service';
import {ReplaySubject} from 'rxjs';
import {AddOrUpdateError} from '../../model/AddOrUpdateError';

@Component({
  selector: 'app-add-or-update-city-form',
  templateUrl: './add-or-update-city-form.component.html',
  styleUrls: ['./add-or-update-city-form.component.css']
})
export class AddOrUpdateCityFormComponent implements OnInit, OnDestroy {

  @Input()
  public governmentTypes: Government[] = ['CORPORATOCRACY', 'PUPPET_STATE', 'NOOCRACY', 'TELLUROCRACY'];
  public standardOfLivingTypes: StandardOfLiving[] = ['ULTRA_HIGH', 'HIGH', 'MEDIUM', 'LOW'];
  public requestErrorsMap = new Map();
  public requestErrors: AddOrUpdateError[] = [];
  private onDestroy = new ReplaySubject(1);
  @Output() getAllCities = new EventEmitter<any>();

  constructor(public confirmDialogRef: MatDialogRef<AddOrUpdateCityFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CityWithOperationType,
              private cityService: CityService) {
  }

  public cityForm: FormGroup;

  ngOnInit(): void {
    if (!this.data.isAddOperation) {
      this.data.city.governor.birthday = new Date(this.data.city.governor.birthday);
    }
    this.cityForm = new FormGroup({
      name: new FormControl(this.data.isAddOperation ? '' : this.data.city.name, Validators.required),
      x: new FormControl(this.data.isAddOperation ? '' : this.data.city.coordinates.x, Validators.required),
      y: new FormControl(this.data.isAddOperation ? '' : this.data.city.coordinates.y, Validators.required),
      area: new FormControl(this.data.isAddOperation ? '' : this.data.city.area, Validators.required),
      population: new FormControl(this.data.isAddOperation ? '' : this.data.city.population, Validators.required),
      metersAboveSeaLevel: new FormControl(this.data.isAddOperation ? '' : this.data.city.metersAboveSeaLevel, Validators.required),
      timezone: new FormControl(this.data.isAddOperation ? '' : this.data.city.timezone, Validators.required),
      government: new FormControl(this.data.isAddOperation ? 'PUPPET_STATE' : this.data.city.government),
      standardOfLiving: new FormControl(this.data.isAddOperation ? 'HIGH' : this.data.city.standardOfLiving),
      height: new FormControl(this.data.isAddOperation ? '' : this.data.city.governor.height, Validators.required),
      birthdayDate: new FormControl(this.data.isAddOperation ? new Date() : this.data.city.governor.birthday),
      birthdayTime: new FormControl(this.data.isAddOperation ?  new Date().getHours() + ':' +  new Date().getMinutes() : this.data.city.governor.birthday.getHours() + ':' + this.data.city.governor.birthday.getMinutes()),
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next(1);
    this.onDestroy.complete();
  }

  submit(): void {
    for (const field in this.cityForm.controls) {
      if (this.cityForm.controls[field].value === '') {
        this.cityForm.controls[field].setValue(null);
      }
    }
    const city = new City(
      this.data.isAddOperation ? 0 : Number(this.data.city.id),
      this.cityForm.get('name').value,
      new Coordinates(0, this.cityForm.get('x').value.toString(), this.cityForm.get('y').value.toString()),
      this.data.isAddOperation ? null : this.data.city.creationDate,
      this.cityForm.get('area').value.toString(),
      this.cityForm.get('population').value.toString(),
      this.cityForm.get('metersAboveSeaLevel').value.toString(),
      this.cityForm.get('timezone').value.toString(),
      this.cityForm.get('government').value,
      this.cityForm.get('standardOfLiving').value,
      new Human(0, this.cityForm.get('height').value.toString(), this.getCorrectDate(this.cityForm.get('birthdayTime').value, this.cityForm.get('birthdayDate').value))
    );
    console.log(city)
    this.data.isAddOperation ? this.addCity(city) : this.updateCity(city);
  }

  getCorrectDate(time: string, mainDate: Date): Date {
    if (mainDate === null || time === null) {
      return null;
    } else {
      const correctDate = new Date();
      const hours = time.substr(0, time.indexOf(':'));
      const min = time.substr(time.indexOf(':') + 1, time.length - 1);
      correctDate.setFullYear(mainDate?.getFullYear(),
        mainDate?.getMonth(), mainDate?.getDate());
      correctDate.setHours(Number(hours), Number(min));
      return correctDate;
    }
  }

  updateCity(updatedCity: City): void {
    this.cityService.updateCity(updatedCity).pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => {
      this.getAllCities.emit();
      this.closeDialog();
    }, (error: any) => {
      this.requestErrors = error.error.errors;
      this.requestErrorsMap.clear();
      this.requestErrors.forEach((err: AddOrUpdateError) => {
        this.requestErrorsMap.set(err.name, err.desc);
      });
    });
  }

  addCity(newCity: City): void {
    this.cityService.addCity(newCity).pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => {
      this.getAllCities.emit();
      this.closeDialog();
    }, (error: any) => {
      console.log(error)
      this.requestErrors = error.error.errors;
      this.requestErrorsMap.clear();
      this.requestErrors.forEach((err: AddOrUpdateError) => {
        this.requestErrorsMap.set(err.name, err.desc);
      });
    });
  }

  closeDialog(): void {
    this.confirmDialogRef.close();
  }

}

export interface CityWithOperationType {
  city: City;
  isAddOperation: boolean;
}
