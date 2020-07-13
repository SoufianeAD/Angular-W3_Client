import { TestBed } from '@angular/core/testing';

import { MagasinsService } from './magasins.service';

describe('MagasinsService', () => {
  let service: MagasinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagasinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
