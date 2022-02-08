import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceBuyNowComponent } from './marketplace-buy-now.component';

describe('MarketplaceBuyNowComponent', () => {
  let component: MarketplaceBuyNowComponent;
  let fixture: ComponentFixture<MarketplaceBuyNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceBuyNowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceBuyNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
