import { TestBed } from '@angular/core/testing';

import { ListaProyectosService } from './lista-proyectos.service';

describe('ListaProyectosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaProyectosService = TestBed.get(ListaProyectosService);
    expect(service).toBeTruthy();
  });
});
