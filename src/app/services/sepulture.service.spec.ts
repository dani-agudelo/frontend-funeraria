import { TestBed } from '@angular/core/testing';

import { SepultureService } from './sepulture.service';

describe('SepultureService', () => {
  let service: SepultureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SepultureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
