import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNowDetailsComponent } from './buy-now-details.component';

describe('BuyNowDetailsComponent', () => {
  let component: BuyNowDetailsComponent;
  let fixture: ComponentFixture<BuyNowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyNowDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyNowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
