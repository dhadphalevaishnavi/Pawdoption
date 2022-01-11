import { TestBed } from '@angular/core/testing';

import { PassSearchResultService } from './pass-search-result.service';

describe('PassSearchResultService', () => {
  let service: PassSearchResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassSearchResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
