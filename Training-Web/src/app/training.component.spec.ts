import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingComponent } from './training.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TrainingService } from './service/training.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Messages } from './utils/messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TrainingComponent', () => {
  let trainingComp: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let originalTimeout;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [BsDatepickerModule.forRoot(), HttpClientModule,ReactiveFormsModule,BrowserAnimationsModule],
      providers: [TrainingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    fixture = TestBed.createComponent(TrainingComponent);
    trainingComp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    fixture.detectChanges();
    
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create component', () => {
    expect(trainingComp).toBeTruthy();
  });

  it(`should have as title`, async(() => {
    expect(trainingComp.trainingPageTitle).toEqual(Messages.TRAINING_PAGE_TITLE)
  }));

  it(`form should be invalid - training name is null`, async(() => {
    trainingComp.trainingFG.controls['TrainingName'].setValue('');  
    expect(trainingComp.trainingFG.valid).toBeFalsy();
  }));

  it(`form should be invalid - For all required fields`, async(() => {  
     trainingComp.trainingFG.markAllAsTouched();
     trainingComp.trainingFG.controls['TrainingName'].setValue('');   
     expect(trainingComp.formErrors.TrainingName.trim()).toEqual(Messages.TRAININGNAME_REQUIRED)
     expect(trainingComp.formErrors.StartDate.trim()).toEqual(Messages.STARTDATE_REQUIRED)
     expect(trainingComp.formErrors.EndDate.trim()).toEqual(Messages.ENDDATE_REQUIRED)
  }));

  it(`form should be invalid - training name min length`, async(() => {  
      trainingComp.trainingFG.markAllAsTouched();
      trainingComp.trainingFG.controls['TrainingName'].setValue('ab'); 
      expect(trainingComp.formErrors.TrainingName.trim()).toEqual(Messages.TRAININGNAME_MIN_INVALID)
  }));

  it(`form should be invalid - training name all characters`, async(() => {  
    trainingComp.trainingFG.markAllAsTouched();
    trainingComp.trainingFG.controls['TrainingName'].setValue('1234abc');   
    expect(trainingComp.formErrors.TrainingName.trim()).toEqual(Messages.TRAININGNAME_PATTERN_INVALID)
  }));

  // it(`form should be invalid - compare dates is not valid`, async(() => {
  //   trainingComp.trainingFG.markAllAsTouched();
  //   trainingComp.trainingFG.setValue({
  //     TrainingName: 'ABC',
  //     DateGroup: {
  //       StartDate: '10-10-2019',
  //       EndDate: '10-10-2018'
  //     }
  //   });

  //    if(trainingComp.trainingFG.valid)
  //          console.log('valid ',trainingComp.formErrors)
  //          else
  //          console.log('in valid',trainingComp.formErrors)
  //    expect(trainingComp.formErrors.StartDate.trim()).toEqual(Messages.DATECOMPARE_INVALID)
  // }));

});
