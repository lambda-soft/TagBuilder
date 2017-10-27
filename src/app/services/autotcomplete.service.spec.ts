import { TestBed, inject } from '@angular/core/testing';

import { AutotcompleteService } from './autotcomplete.service';

describe('AutotcompleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutotcompleteService]
    });
  });

  it('should be created', inject([AutotcompleteService], (service: AutotcompleteService) => {
    expect(service).toBeTruthy();
  }));
});
