import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {City} from '../../model/City';

@Component({
  selector: 'app-city-table',
  templateUrl: './city-table.component.html',
  styleUrls: ['./city-table.component.css']
})
export class CityTableComponent implements OnInit, OnChanges {

  @Input() cities = [];
  @Output() public updateCityEvent = new EventEmitter();
  @Output() deleteCityEvent = new EventEmitter<number>();
  private isFirstChange = true;
  public displayedColumns = ['id', 'name', 'x', 'y', 'creationDate', 'area',
    'population', 'metersAboveSeaLevel', 'timezone', 'government', 'standardOfLiving', 'height', 'birthday', 'update', 'delete'];
  @ViewChild('table', {static: false}) table: MatTable<City>;
  public dataSource = new MatTableDataSource<City>();

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<City>(this.cities);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isFirstChange) {
      this.isFirstChange = false;
    } else {
      this.dataSource = new MatTableDataSource<City>(this.cities);
      this.table.renderRows();
      this.changeDetectorRef.detectChanges();
    }
  }

  updateCity(city: City): void {
    this.updateCityEvent.emit(city);
  }

  deleteCity(city: City): void {
    this.deleteCityEvent.emit(city.id);
  }
}
