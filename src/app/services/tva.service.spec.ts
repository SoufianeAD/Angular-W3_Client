import { TestBed } from '@angular/core/testing';

import { TvaService } from './tva.service';

describe('TvaService', () => {
  let service: TvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
