import { TestBed } from '@angular/core/testing';

import { ConsultoriosService } from './consultorios.service';

describe('ConsultoriosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultoriosService = TestBed.get(ConsultoriosService);
    expect(service).toBeTruthy();
  });
});
