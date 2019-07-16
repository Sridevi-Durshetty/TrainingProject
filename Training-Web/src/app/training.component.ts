import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TrainingService } from './service/training.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Training } from './model/training';
import * as moment from 'moment';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;
  trainingFG: FormGroup;

  validationMessages = {
    'TrainingName': {
      'required': 'Training Name is required',
      'minlength': 'information must be more than 3 chars',
      'pattern': 'Training Name should be characters'
    },
    'StartDate': {
      'required': 'Start date is required',
      'undefined': 'Invalid date'

    },
    'EndDate': {
      'required': 'End date is required'
    },
    'DateGroup': {
      'dateCompare': 'End Date should be greater than Start Date'
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

  ngOnInit() {

    //created formgroup and formcontrols with validators using formbuilder
    this.trainingFG = this.trainingFB.group({
      TrainingName: ['', [Validators.required, 
                          Validators.minLength(3), 
                          Validators.pattern('[a-zA-Z ]*')]],
      DateGroup: this.trainingFB.group({
            StartDate: ['', Validators.required],
            EndDate: ['', [Validators.required]]
      })
    });

    this.trainingFG.valueChanges.subscribe((data)=>{
      this.logValidationErrors(this.trainingFG)
    })    

  }

  logValidationErrors(group: FormGroup= this.trainingFG): void {   
    Object.keys(group.controls).forEach((key: string) => {
     
      const abstractControl = group.get(key);
        this.formErrors[key] = '';       
        if (abstractControl && !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)) {      
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {  
              console.log('Key = ' + key + ' && Value = ' + abstractControl.value);             
              this.formErrors[key] += messages[errorKey] == null ? 'Invalid Data ' : messages[errorKey] + ' ';
            }
          }
        }
        console.log('form errror ',this.formErrors); 

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } 
    });
  }

  //TO ADD Training -- start
  // adding new training by calling api call
  addNewTraining() {   
    console.log('this.trainingFG', this.trainingFG.value.DateGroup.StartDate)    
    
    const ctrl= this.trainingFG.value.DateGroup
    const stDate = moment(ctrl.StartDate).format('YYYY/MM/DD');
    const enDate = moment(ctrl.EndDate).format('YYYY/MM/DD');   

    // console.log('moment date', stDate);
    
    this.newTraining = new Training();
    this.newTraining.TrainingName= this.trainingFG.value.TrainingName;
    this.newTraining.StartDate= stDate;
    this.newTraining.EndDate =enDate;

    console.log("Training add component after:", this.newTraining);  
  }
  //TO ADD Training -- end

}
