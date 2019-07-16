import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;
  constructor() {

    this.datePickerConfig = Object.assign({}, 
      { 
        containerClass: 'theme-dark-blue', 
        showWeekNumbers: false,
        minDate: new Date(2018,0,1),
        dateInputFormat: 'YYYY/MM/DD'
      })
      
   }

  ngOnInit() {
  }

}
