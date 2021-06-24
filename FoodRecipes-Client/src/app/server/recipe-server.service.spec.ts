import { TestBed } from '@angular/core/testing';

import { RecipeServerService } from './recipe-server.service';

describe('RecipeServerService', () => {
  let service: RecipeServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
