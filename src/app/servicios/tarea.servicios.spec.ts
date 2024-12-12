import { TestBed } from '@angular/core/testing';

import { TareaServicios } from './tarea.servicios';

describe('TareaServicios', () => {
  let servicios: TareaServicios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    servicios = TestBed.inject(TareaServicios);
  });

  it('should be created', () => {
    expect(servicios).toBeTruthy();
  });
});
