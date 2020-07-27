import { TestBed } from '@angular/core/testing';

import { VistaXRolService } from './vista-xrol.service';

describe('VistaXRolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VistaXRolService = TestBed.get(VistaXRolService);
    expect(service).toBeTruthy();
  });
});
