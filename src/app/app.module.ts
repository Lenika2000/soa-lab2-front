import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {AddOrUpdateCityFormComponent} from './components/add-or-update-city-form/add-or-update-city-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {CityTableComponent} from './components/city-table/city-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FilterAndSortFormComponent } from './components/filter-and-sort-form/filter-and-sort-form.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AddOrUpdateCityFormComponent,
    CityTableComponent,
    FilterAndSortFormComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        NgxMaterialTimepickerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatRippleModule,
        MatCheckboxModule,
        FormsModule,
        MatRadioModule
    ],
  entryComponents: [
    AddOrUpdateCityFormComponent
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
