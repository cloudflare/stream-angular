import { TestBed } from '@angular/core/testing';

import { StreamAngularService } from './stream-angular.service';

describe('StreamAngularService', () => {
  let service: StreamAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
