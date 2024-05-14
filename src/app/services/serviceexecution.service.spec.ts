import { TestBed } from '@angular/core/testing';

import { ServiceexecutionService } from './serviceexecution.service';

describe('ServiceexecutionService', () => {
  let service: ServiceexecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceexecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
