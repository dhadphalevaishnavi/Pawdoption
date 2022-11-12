import { TestBed } from '@angular/core/testing';

import { PassComplaintEmailService } from './pass-complaint-email.service';

describe('PassComplaintEmailService', () => {
  let service: PassComplaintEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassComplaintEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
