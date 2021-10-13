import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateCityFormComponent } from './add-or-update-city-form.component';

describe('AddOrUpdateCityFormComponent', () => {
  let component: AddOrUpdateCityFormComponent;
  let fixture: ComponentFixture<AddOrUpdateCityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateCityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateCityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
