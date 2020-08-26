import { TestBed } from '@angular/core/testing';

import { ProductOperationsDataService } from './product-operations-data.service';

describe('ProductOperationsDataService', () => {
  let service: ProductOperationsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductOperationsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
