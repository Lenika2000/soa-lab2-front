import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Government} from '../../model/Government';
import {StandardOfLiving} from '../../model/StandardOfLiving';
import {CityService} from '../../services/city.service';
import {City} from '../../model/City';
import {Coordinates} from '../../model/Coordinates';
import {Human} from '../../model/Human';

@Component({
  selector: 'app-add-or-update-city-form',
  templateUrl: './add-or-update-city-form.component.html',
  styleUrls: ['./add-or-update-city-form.component.css']
})
export class AddOrUpdateCityFormComponent implements OnInit {

  @Input()
  public isAddCityForm = true;
  public governmentTypes: Government[] = ['CORPORATOCRACY' , 'PUPPET_STATE' , 'NOOCRACY' , 'TELLUROCRACY'];
  public standardOfLivingTypes: StandardOfLiving[] = ['ULTRA_HIGH' , 'HIGH' , 'MEDIUM' , 'LOW'];
  constructor(private cityService: CityService) { }

  public cityForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    x: new FormControl(''),
    y: new FormControl(''),
    area: new FormControl(''),
    population: new FormControl(''),
    metersAboveSeaLevel: new FormControl(''),
    timezone: new FormControl(''),
    government: new FormControl(''),
    standardOfLiving: new FormControl(''),
    height: new FormControl(''),
    birthdayDate: new FormControl(''),
    birthdayTime: new FormControl(''),
  });

  ngOnInit(): void {
  }

  submit(): void {
    const city = new City(
      0,
      this.cityForm.get('name').value,
      new Coordinates(0, this.cityForm.get('x').value, this.cityForm.get('y').value),
      null,
      this.cityForm.get('area').value,
      this.cityForm.get('population').value,
      this.cityForm.get('metersAboveSeaLevel').value,
      this.cityForm.get('timezone').value,
      this.cityForm.get('government').value,
      this.cityForm.get('standardOfLiving').value,
      new Human(0, this.cityForm.get('height').value, this.getCorrectDate(this.cityForm.get('birthdayTime').value, this.cityForm.get('birthdayDate').value))
    );
    this.cityService.addCity(city).subscribe(() => {
      console.log('add');
    })
  }

  getCorrectDate(time: string, mainDate: Date): Date {
    const correctDate = new Date();
    const hours = time.substr(0, time.indexOf(':'));
    const min = time.substr(time.indexOf(':') + 1, time.length - 1);
    correctDate.setFullYear(mainDate.getFullYear(),
      mainDate.getMonth(), mainDate.getDate());
    correctDate.setHours(Number(hours), Number(min));
    return correctDate;
  }

}
