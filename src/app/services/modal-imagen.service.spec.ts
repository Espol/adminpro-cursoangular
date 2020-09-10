import { TestBed } from '@angular/core/testing';

import { ModalImagenService } from './modal-imagen.service';

describe('ModalImagenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalImagenService = TestBed.get(ModalImagenService);
    expect(service).toBeTruthy();
  });
});
