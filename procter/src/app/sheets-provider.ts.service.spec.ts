import { TestBed } from '@angular/core/testing';

import { SheetsProvider.TsService } from './sheets-provider.ts.service';

describe('SheetsProvider.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SheetsProvider.TsService = TestBed.get(SheetsProvider.TsService);
    expect(service).toBeTruthy();
  });
});
