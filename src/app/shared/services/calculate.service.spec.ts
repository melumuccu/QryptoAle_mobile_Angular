import { TestBed } from '@angular/core/testing';

import { CalculateService } from './calculate.service';

describe('CalculateService', () => {
  let service: CalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#round 指定桁数(n>0)で切り捨て', () => {
    const target = service.round(999.949, 1);
    expect(target).toBe(1000.9);
  });

  it('#round 指定桁数(n>0)で切り上げ', () => {
    const target = service.round(1000.005, 2);
    expect(target).toBe(1000.01);
  });

  it('#round 指定桁数(n=0)で切り捨て', () => {
    const target = service.round(999.499, 0);
    expect(target).toBe(999);
  });

  it('#round 指定桁数(n=0)で切り上げ', () => {
    const target = service.round(1000.5, 0);
    expect(target).toBe(1001);
  });

  it('#round 指定桁数(n<0)で切り捨て', () => {
    const target = service.round(994.999, -1);
    expect(target).toBe(990);
  });

  it('#round 指定桁数(n<0)で切り上げ', () => {
    const target = service.round(1050.0, -2);
    expect(target).toBe(1100);
  });
});
