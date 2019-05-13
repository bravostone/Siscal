import { TestBed } from '@angular/core/testing';

import { RegistroNoConformidadService } from './registro-no-conformidad.service';

describe('RegistroNoConformidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistroNoConformidadService = TestBed.get(RegistroNoConformidadService);
    expect(service).toBeTruthy();
  });
});
