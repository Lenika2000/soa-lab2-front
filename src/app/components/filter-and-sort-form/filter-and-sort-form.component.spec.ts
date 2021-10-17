import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAndSortFormComponent } from './filter-and-sort-form.component';

describe('FilterAndSortFormComponent', () => {
  let component: FilterAndSortFormComponent;
  let fixture: ComponentFixture<FilterAndSortFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAndSortFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAndSortFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
