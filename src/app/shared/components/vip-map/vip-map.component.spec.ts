import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipMapComponent } from './vip-map.component';

describe('VipMapComponent', () => {
  let component: VipMapComponent;
  let fixture: ComponentFixture<VipMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VipMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VipMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
