import {Component, Inject, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Government} from '../../model/Government';
import {StandardOfLiving} from '../../model/StandardOfLiving';
import {City} from '../../model/City';
import {Coordinates} from '../../model/Coordinates';
import {Human} from '../../model/Human';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-update-city-form',
  templateUrl: './add-or-update-city-form.component.html',
  styleUrls: ['./add-or-update-city-form.component.css']
})
export class AddOrUpdateCityFormComponent implements OnInit {

  @Input()
  public governmentTypes: Government[] = ['CORPORATOCRACY' , 'PUPPET_STATE' , 'NOOCRACY' , 'TELLUROCRACY'];
  public standardOfLivingTypes: StandardOfLiving[] = ['ULTRA_HIGH' , 'HIGH' , 'MEDIUM' , 'LOW'];

  @Output() cityAdd = new EventEmitter<any>();
  @Output() cityUpdate = new EventEmitter<any>();

  constructor(public confirmDialogRef: MatDialogRef<AddOrUpdateCityFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CityWithOperationType) { }

  public cityForm: FormGroup;

  ngOnInit(): void {
    if (!this.data.isAddOperation) {
      this.data.city.governor.birthday = new Date(this.data.city.governor.birthday);
    }
    this.cityForm = new FormGroup({
      name: new FormControl(this.data.isAddOperation ? '' : this.data.city.name),
      x: new FormControl(this.data.isAddOperation ? '' : this.data.city.coordinates.x),
      y: new FormControl(this.data.isAddOperation ? '' : this.data.city.coordinates.y),
      area: new FormControl(this.data.isAddOperation ? '' : this.data.city.area),
      population: new FormControl(this.data.isAddOperation ? '' : this.data.city.population),
      metersAboveSeaLevel: new FormControl(this.data.isAddOperation ? '' : this.data.city.metersAboveSeaLevel),
      timezone: new FormControl(this.data.isAddOperation ? '' : this.data.city.timezone),
      government: new FormControl(this.data.isAddOperation ? '' : this.data.city.government),
      standardOfLiving: new FormControl(this.data.isAddOperation ? '' : this.data.city.standardOfLiving),
      height: new FormControl(this.data.isAddOperation ? '' : this.data.city.governor.height),
      birthdayDate: new FormControl(this.data.isAddOperation ? '' : this.data.city.governor.birthday),
      birthdayTime: new FormControl(this.data.isAddOperation ? '' : this.data.city.governor.birthday.getHours() + ':' + this.data.city.governor.birthday.getMinutes()),
    });
  }

  submit(): void {
    for (const field in this.cityForm.controls) {
      if (this.cityForm.controls[field].value === '') {
        this.cityForm.controls[field].setValue(null);
      }
    }
    const city = new City(
      this.data.isAddOperation ? 0 : this.data.city.id,
      this.cityForm.get('name').value,
      new Coordinates(0, this.cityForm.get('x').value, this.cityForm.get('y').value),
      this.data.isAddOperation ? null : this.data.city.creationDate,
      this.cityForm.get('area').value,
      this.cityForm.get('population').value,
      this.cityForm.get('metersAboveSeaLevel').value,
      this.cityForm.get('timezone').value,
      this.cityForm.get('government').value,
      this.cityForm.get('standardOfLiving').value,
      new Human(0, this.cityForm.get('height').value, this.getCorrectDate(this.cityForm.get('birthdayTime').value, this.cityForm.get('birthdayDate').value))
    );
    this.data.isAddOperation ? this.cityAdd.emit(city) : this.cityUpdate.emit(city);
    this.closeDialog();
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

  closeDialog(): void {
    this.confirmDialogRef.close();
  }

}

export interface CityWithOperationType {
  city: City;
  isAddOperation: boolean;
}
