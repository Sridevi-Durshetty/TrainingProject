import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TrainingService } from './service/training.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Training } from './model/training';

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
      'pattern':'Training Name should be characters'
    },
    'StartDate': {
      'required': 'Start date is required',
      'undefined':'Invalid date'
      
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
    'DateGroup':''
  };
  private newTraining : Training
  constructor(private refTrainingService: TrainingService,
                private trainingFB: FormBuilder) {

    this.datePickerConfig = Object.assign({}, 
      { 
        containerClass: 'theme-dark-blue', 
        showWeekNumbers: false,
        minDate: new Date(2018,0,1),
        dateInputFormat: 'YYYY/MM/DD'
      })    

   }

  ngOnInit() {

    //created formgroup and formcontrols with validators using formbuilder
    this.trainingFG = this.trainingFB.group({
      TrainingName: ['', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]],
      DateGroup: this.trainingFB.group({
          StartDate: ['', Validators.required],
          EndDate: ['', [Validators.required]]
          })
    });
  }

}
