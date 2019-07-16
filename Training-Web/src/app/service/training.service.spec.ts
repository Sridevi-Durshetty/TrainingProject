import { TestBed } from '@angular/core/testing';

import { TrainingService } from './training.service';
import { HttpClientModule } from '@angular/common/http';

describe('TrainingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: TrainingService = TestBed.get(TrainingService);
    expect(service).toBeTruthy();
  });
});
