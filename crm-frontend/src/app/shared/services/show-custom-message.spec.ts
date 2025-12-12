import { TestBed } from '@angular/core/testing';

import { ShowCustomMessage } from './show-custom-message';

describe('ShowCustomMessage', () => {
  let service: ShowCustomMessage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowCustomMessage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
