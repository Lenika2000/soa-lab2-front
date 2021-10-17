import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filter-and-sort-form',
  templateUrl: './filter-and-sort-form.component.html',
  styleUrls: ['./filter-and-sort-form.component.css']
})
export class FilterAndSortFormComponent implements OnInit {

  constructor() {
  }

  public fields = ['name', 'x', 'y', 'area', 'population', 'metersAboveSeaLevel', 'timezone', 'government', 'standardOfLiving', 'height', 'birthday'];
  public cityFilterAndSortForm: FormGroup;
  public selectedFields = {
    name: false,
    x: false,
    y: false,
    area: false,
    population: false,
    metersAboveSeaLevel: false,
    timezone: false,
    government: false,
    standardOfLiving: false,
    height: false,
    birthdayDate: false,
    birthdayTime: false
  };


  ngOnInit(): void {
    this.cityFilterAndSortForm = new FormGroup({
      name: new FormControl({value: '', disabled: true}),
      x1: new FormControl({value: '', disabled: true}),
      x2: new FormControl({value: '', disabled: true}),
      y1: new FormControl({value: '', disabled: true}),
      y2: new FormControl({value: '', disabled: true}),
      area1: new FormControl({value: '', disabled: true}),
      area2: new FormControl({value: '', disabled: true}),
      population1: new FormControl({value: '', disabled: true}),
      population2: new FormControl({value: '', disabled: true}),
      metersAboveSeaLevel1: new FormControl({value: '', disabled: true}),
      metersAboveSeaLevel2: new FormControl({value: '', disabled: true}),
      timezone1: new FormControl({value: '', disabled: true}),
      timezone2: new FormControl({value: '', disabled: true}),
      CORPORATOCRACY: new FormControl({value: '', disabled: true}),
      PUPPET_STATE: new FormControl({value: '', disabled: true}),
      NOOCRACY: new FormControl({value: '', disabled: true}),
      TELLUROCRACY: new FormControl({value: '', disabled: true}),
      ULTRA_HIGH: new FormControl({value: '', disabled: true}),
      HIGH: new FormControl({value: '', disabled: true}),
      MEDIUM: new FormControl({value: '', disabled: true}),
      LOW: new FormControl({value: '', disabled: true}),
      // government1: new FormControl(''),
      // government2: new FormControl(''),
      // standardOfLiving1: new FormControl(''),
      // standardOfLiving2: new FormControl(''),
      height1: new FormControl({value: '', disabled: true}),
      height2: new FormControl({value: '', disabled: true}),
      birthdayDate1: new FormControl({value: '', disabled: true}),
      birthdayDate2: new FormControl({value: '', disabled: true}),
      birthdayTime1: new FormControl({value: '', disabled: true}),
      birthdayTime2: new FormControl({value: '', disabled: true}),
      sort_field: new FormControl({value: ''}),
      sort_type: new FormControl({value: ''}),
      size: new FormControl('5'),
      page: new FormControl({value: ''}),
    });
  }

  submit(): void {

  }
}
