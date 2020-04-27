import { TestBed } from '@angular/core/testing';

import { CloudflareStreamService } from './cloudflare-stream.service';

describe('CloudflareStreamService', () => {
  let service: CloudflareStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudflareStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
