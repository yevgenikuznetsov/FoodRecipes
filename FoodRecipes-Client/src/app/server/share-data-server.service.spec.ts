import { TestBed } from '@angular/core/testing';

import { ShareDataServerService } from './share-data-server.service';

describe('ShareDataServerService', () => {
  let service: ShareDataServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDataServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
