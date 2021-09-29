import {TestBed} from '@angular/core/testing';

import {WeatherManagerService} from './weather-manager.service';

describe('WeatherManagerService', () => {
  let service: WeatherManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
