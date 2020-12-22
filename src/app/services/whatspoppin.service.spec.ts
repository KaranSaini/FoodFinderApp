import { TestBed } from '@angular/core/testing';

import { WhatspoppinService } from './whatspoppin.service';

describe('WhatspoppinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhatspoppinService = TestBed.get(WhatspoppinService);
    expect(service).toBeTruthy();
  });
});
