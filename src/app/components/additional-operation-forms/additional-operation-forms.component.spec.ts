import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalOperationFormsComponent } from './additional-operation-forms.component';

describe('AdditionalOperationFormsComponent', () => {
  let component: AdditionalOperationFormsComponent;
  let fixture: ComponentFixture<AdditionalOperationFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalOperationFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalOperationFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
