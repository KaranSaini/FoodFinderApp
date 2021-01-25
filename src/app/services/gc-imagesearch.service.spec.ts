import { TestBed } from '@angular/core/testing';

import { GcImagesearchService } from './gc-imagesearch.service';

fdescribe('GcImagesearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  const service: GcImagesearchService = TestBed.get(GcImagesearchService);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
