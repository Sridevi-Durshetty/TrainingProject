import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TrainingComponent } from './training.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    TrainingComponent
  ],
  imports: [
    BrowserModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [TrainingComponent]
})
export class AppModule { }
