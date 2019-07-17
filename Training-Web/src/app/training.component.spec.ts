import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingComponent } from './training.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TrainingService } from './service/training.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Messages } from './utils/messages';

describe('TrainingComponent', () => {
  let trainingComp: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [BsDatepickerModule.forRoot(), HttpClientModule,ReactiveFormsModule,],
      providers: [TrainingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    trainingComp = fixture.componentInstance;
    de= fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(trainingComp).toBeTruthy();
  });

  it(`should have as title`, async(() => {
    expect(trainingComp.trainingPageTitle).toEqual(Messages.TRAINING_PAGE_TITLE)
  }));

  it(`form should be invalid - training name is null`, async(() => {
    trainingComp.trainingFG.controls['TrainingName'].setValue('');  
    // console.log(trainingComp.trainingFG)  
    expect(trainingComp.trainingFG.invalid).toBeTruthy();
  }));

});
