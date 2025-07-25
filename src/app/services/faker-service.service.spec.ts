import { TestBed } from '@angular/core/testing';

import { FakerServiceService } from './faker-service.service';

describe('FakerServiceService', () => {
  let service: FakerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
