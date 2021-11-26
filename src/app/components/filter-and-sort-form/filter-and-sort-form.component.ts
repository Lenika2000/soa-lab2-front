import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PaginationResult} from '../../model/PaginationResult';

@Component({
  selector: 'app-filter-and-sort-form',
  templateUrl: './filter-and-sort-form.component.html',
  styleUrls: ['./filter-and-sort-form.component.css']
})
export class FilterAndSortFormComponent implements OnInit, OnChanges {

  @Output() getCitiesEvent = new EventEmitter<any>();
  @Input()  public paginationResult: PaginationResult = {
    pageSize: 5,
    pageIndex: 0,
    totalItems: 0,
    list: []
  };
  public pageIndexes = [1, 2];
  public fields = ['name', 'x', 'y', 'area', 'population', 'meters_above_sea_level', 'timezone', 'government', 'standard_of_living', 'height', 'birthday'];
  public governmentCheckboxGroup: FormGroup;
  public standardOfLivingCheckboxGroup: FormGroup;
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
  };


  constructor() {
    this.governmentCheckboxGroup = new FormGroup({
      CORPORATOCRACY: new FormControl({value: '', disabled: true}),
      PUPPET_STATE: new FormControl({value: '', disabled: true}),
      NOOCRACY: new FormControl({value: '', disabled: true}),
      TELLUROCRACY: new FormControl({value: '', disabled: true}),
    });
    this.standardOfLivingCheckboxGroup = new FormGroup({
      ULTRA_HIGH: new FormControl({value: '', disabled: true}),
      HIGH: new FormControl({value: '', disabled: true}),
      MEDIUM: new FormControl({value: '', disabled: true}),
      LOW: new FormControl({value: '', disabled: true}),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeRangeOfPageIndexes(this.paginationResult.totalItems, this.paginationResult.pageSize);
  }

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
      meters_above_sea_level1: new FormControl({value: '', disabled: true}),
      meters_above_sea_level2: new FormControl({value: '', disabled: true}),
      timezone1: new FormControl({value: '', disabled: true}),
      timezone2: new FormControl({value: '', disabled: true}),
      height1: new FormControl({value: '', disabled: true}),
      height2: new FormControl({value: '', disabled: true}),
      birthday1: new FormControl({value: '', disabled: true}),
      birthday2: new FormControl({value: '', disabled: true}),
      sort_field: new FormControl('id'),
      sort_type: new FormControl('asc'),
      size: new FormControl('5'),
      page: new FormControl(1),
    });
  }

  submit(): void {
    const filterData = {
      sort: [this.cityFilterAndSortForm.get('sort_field').value + '_' + this.cityFilterAndSortForm.get('sort_type').value],
      name: (!this.cityFilterAndSortForm.get('name').value || this.cityFilterAndSortForm.get('name').value === '' || !this.selectedFields.name ) ? [] : [this.cityFilterAndSortForm.get('name').value],
      x:  this.getFilterParameter(this.selectedFields.x, 'x', this.cityFilterAndSortForm.get('x1').value, this.cityFilterAndSortForm.get('x2').value),
      y: this.getFilterParameter(this.selectedFields.y, 'y', this.cityFilterAndSortForm.get('y1').value, this.cityFilterAndSortForm.get('y2').value),
      area: this.getFilterParameter(this.selectedFields.area, 'area', this.cityFilterAndSortForm.get('area1').value, this.cityFilterAndSortForm.get('area2').value),
      population: this.getFilterParameter(this.selectedFields.population, 'population', this.cityFilterAndSortForm.get('population1').value, this.cityFilterAndSortForm.get('population2').value),
      meters_above_sea_level: this.getFilterParameter(this.selectedFields.metersAboveSeaLevel, 'meters_above_sea_level', this.cityFilterAndSortForm.get('meters_above_sea_level1').value, this.cityFilterAndSortForm.get('meters_above_sea_level2').value),
      timezone: this.getFilterParameter(this.selectedFields.timezone, 'timezone', this.cityFilterAndSortForm.get('timezone1').value, this.cityFilterAndSortForm.get('timezone2').value),
      standard_of_living: this.getCheckboxParameter(this.selectedFields.standardOfLiving, this.standardOfLivingCheckboxGroup),
      government: this.getCheckboxParameter(this.selectedFields.government, this.governmentCheckboxGroup),
      height: this.getFilterParameter(this.selectedFields.height, 'height', this.cityFilterAndSortForm.get('height1').value, this.cityFilterAndSortForm.get('height2').value),
      birthday: this.getFilterParameter(this.selectedFields.birthdayDate, 'birthday', this.cityFilterAndSortForm.get('birthday1').value, this.cityFilterAndSortForm.get('birthday2').value),
      size: [this.cityFilterAndSortForm.get('size').value],
      page: [this.cityFilterAndSortForm.get('page').value - 1],
    };
    console.log(filterData);
    this.getCitiesEvent.emit(filterData);
  }

  getFilterParameter(isFieldSelect: boolean, fieldName: string, a?: any, b?: any, ): any{
    if (!isFieldSelect) {
      return [];
    } else {
      if (a === '' && b === '') {
        return [];
      }
      if (a === '') {
        return ['', b];
      }
      if (b === '') {
        return [a, ''];
      }
      if (a === b) {
        return a;
      }
    }
    return [a, b];
  }

  getCheckboxParameter(isFieldSelect: boolean, checkboxGroup: FormGroup): string[]{
    if (!isFieldSelect) {
      return [];
    } else {
      const arr = [];
      for (const field in checkboxGroup.controls) {
        if (checkboxGroup.get(field).value && !checkboxGroup.disabled) {
          arr.push(field);
        }
      }
      return arr;
    }
  }

  changeEnumFormState(type: string): void {
    if (type === 'government') {
      this.selectedFields.government = !this.selectedFields.government;
      this.selectedFields.government ? this.governmentCheckboxGroup.enable() : this.governmentCheckboxGroup.disable();
    } else  {
      this.selectedFields.standardOfLiving = !this.selectedFields.standardOfLiving;
      this.selectedFields.standardOfLiving ? this.standardOfLivingCheckboxGroup.enable() : this.standardOfLivingCheckboxGroup.disable();
    }
  }

  changeRangeOfPageIndexes(totalItems: number, pageSize: number): void {
    this.pageIndexes = [];
    const selectionItemsQuality = Math.ceil(totalItems / pageSize);
    for (let i = 1; i <= selectionItemsQuality; i++) {
      this.pageIndexes.push(i);
    }
    if (this.pageIndexes.length === 0) { this.pageIndexes.push(1); }
  }

  onPaginatorPageSizeChange(): void {
    this.changeRangeOfPageIndexes(this.paginationResult.totalItems, this.cityFilterAndSortForm.get('size').value);
  }
}
