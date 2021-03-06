import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TrainingService } from './service/training.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Training } from './model/training';
import * as moment from 'moment';
import { DateDiffValidator } from './utils/datediff.validator';
import { Messages } from './utils/messages';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  trainingPageTitle = Messages.TRAINING_PAGE_TITLE;
  datePickerConfig: Partial<BsDatepickerConfig>;
  trainingFG: FormGroup;
  statusMessage: string;

  validationMessages = {
    'TrainingName': {
      'required': Messages.TRAININGNAME_REQUIRED,
      'minlength': Messages.TRAININGNAME_MIN_INVALID,
      'pattern': Messages.TRAININGNAME_PATTERN_INVALID
    },
    'StartDate': {
      'required': Messages.STARTDATE_REQUIRED
    },
    'EndDate': {
      'required': Messages.ENDDATE_REQUIRED
    },
    'DateGroup': {
      'dateCompare': Messages.DATECOMPARE_INVALID
    }
  };

  formErrors = {
    'TrainingName': '',
    'StartDate': '',
    'EndDate': '',
    'DateGroup': ''
  };

  private newTraining: Training

  constructor(private refTrainingService: TrainingService,
              private trainingFB: FormBuilder) {

    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        minDate: new Date(2018, 0, 1),
        dateInputFormat: 'YYYY/MM/DD'
      })

  }

  /* Intializing training form group and assigning validators */ 
  ngOnInit() {
    this.trainingFG = this.trainingFB.group({
      TrainingName: ['', [Validators.required, 
                          Validators.minLength(3), 
                          Validators.pattern('[a-zA-Z ]*')]],
      DateGroup: this.trainingFB.group({
            StartDate: ['', Validators.required],
            EndDate: ['', [Validators.required]]
     },{validator: DateDiffValidator })
    });


    this.trainingFG.valueChanges.subscribe((data)=>{
      this.logValidationErrors(this.trainingFG)
    })    

  }

  /*  Looping all Validation messages and storing in formErrors object */
  logValidationErrors(group: FormGroup= this.trainingFG): void {   
    Object.keys(group.controls).forEach((key: string) => {
     
      const abstractControl = group.get(key);
        this.formErrors[key] = '';       
        if (abstractControl && !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)) {      
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {  
            // console.log('Key = ' + key + ' && Value = ' + abstractControl.value);             
              this.formErrors[key] += messages[errorKey] == null ? Messages.INVALID_DATA : messages[errorKey];
            //  console.log('form errror ',this.formErrors); 
            }
          }
        }        

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } 
    });
  }

  /* Adding new training by changing the dateformat and calling service method */
  fncAddNewTraining() { 
    const ctrl= this.trainingFG.value.DateGroup
    const stDate = moment(ctrl.StartDate).format('YYYY/MM/DD');
    const enDate = moment(ctrl.EndDate).format('YYYY/MM/DD');     
    
    this.newTraining = new Training();
    this.newTraining.TrainingName= this.trainingFG.value.TrainingName;
    this.newTraining.StartDate= stDate;
    this.newTraining.EndDate =enDate; 

    this.refTrainingService.CreateTraining(this.newTraining)
                          .subscribe(createRes => {
                            this.statusMessage = createRes ? Messages.SUCCESSFULLY_ADDED +  createRes + Messages.DURATION
                                                            : Messages.UNSUCCESSFULLY_ADDED;
                          },
                            error => {
                              console.log(error);
                              this.statusMessage = Messages.COMMON_ERROR_MESSAGE;
                            }
    );
}

}
  


