import { TestBed } from '@angular/core/testing';

import { CuisinesService } from './cuisines.service';

describe('CuisinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuisinesService = TestBed.get(CuisinesService);
    expect(service).toBeTruthy();
  });
});
