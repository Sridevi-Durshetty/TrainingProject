import { TestBed } from '@angular/core/testing';

import { TrainingService } from './training.service';
import { HttpClientModule } from '@angular/common/http';
import { Training } from '../model/training';

describe('TrainingService', () => {
  let trainingService : TrainingService ;
  // beforeEach(() => TestBed.configureTestingModule({
  //   imports: [HttpClientModule],
  // }));

  beforeEach(() =>{
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    trainingService = TestBed.get(TrainingService);
});

  it('should be created', () => {
    // const service: TrainingService = TestBed.get(TrainingService);
    expect(trainingService).toBeTruthy();
  });

  
  // it('should return no. of days, after adding', () => {   
  //   let testTraining : Training
  //   testTraining = new Training();
  //   this.testTraining.TrainingName= "Testing Training";
  //   this.testTraining.StartDate= "2019/07/17";
  //   this.testTraining.EndDate ="2019/07/18"; 
  //   console.log('this.testTraining ',this.testTraining)
  //   trainingService.CreateTraining(this.testTraining).subscribe(res =>{
  //     console.log('test create training',res)
  //     // expect(res).toBe("1");
  //   })    
  //});
})
