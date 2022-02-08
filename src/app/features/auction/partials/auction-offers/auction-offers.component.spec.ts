import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionOffersComponent } from './auction-offers.component';

describe('AuctionOffersComponent', () => {
  let component: AuctionOffersComponent;
  let fixture: ComponentFixture<AuctionOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
