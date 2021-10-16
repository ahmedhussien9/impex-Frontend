import { TestBed } from '@angular/core/testing';

import { RequestQuotationService } from './request-quotation.service';

describe('RequestQuotationService', () => {
  let service: RequestQuotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestQuotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
