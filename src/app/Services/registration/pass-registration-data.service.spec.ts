import { TestBed } from '@angular/core/testing';

import { PassRegistrationDataService } from './pass-registration-data.service';

describe('PassRegistrationDataService', () => {
  let service: PassRegistrationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassRegistrationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
