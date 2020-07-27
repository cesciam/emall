import { TestBed } from '@angular/core/testing';

import { VistaService } from './vista.service';

describe('VistaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VistaService = TestBed.get(VistaService);
    expect(service).toBeTruthy();
  });
});
