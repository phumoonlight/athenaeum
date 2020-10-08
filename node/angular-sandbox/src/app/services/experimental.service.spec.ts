import { TestBed } from '@angular/core/testing';

import { ExperimentalService } from './experimental.service';

describe('ExperimentalService', () => {
  let service: ExperimentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperimentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
