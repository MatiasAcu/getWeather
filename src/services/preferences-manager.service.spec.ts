import {TestBed} from '@angular/core/testing';

import {PreferencesManagerService} from './preferences-manager.service';

describe('CookieManagerService', () => {
  let service: PreferencesManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferencesManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
