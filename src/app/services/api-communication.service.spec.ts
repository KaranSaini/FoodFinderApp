import { TestBed } from '@angular/core/testing';

import { ApiCommunicationService } from './api-communication.service';

describe('ApiCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCommunicationService = TestBed.get(ApiCommunicationService);
    expect(service).toBeTruthy();
  });
});
