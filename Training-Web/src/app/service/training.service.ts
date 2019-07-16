import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Training } from '../model/training';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  trainingApiURL=environment.TRAINING_API_URL;

  constructor(private http:HttpClient) {}

  // Adding new training by calling post method
  CreateTraining(newTraining:Training):Observable<Training>{
    console.log('newTraining :', newTraining)
        return this.http.post<Training>(this.trainingApiURL+'api/training',newTraining)
                    .pipe(catchError(this.ErrorHandling));
  }

  
   // handling error when interact with info api
   ErrorHandling(errorResponse:HttpErrorResponse){
    return throwError(errorResponse);
  }
}
