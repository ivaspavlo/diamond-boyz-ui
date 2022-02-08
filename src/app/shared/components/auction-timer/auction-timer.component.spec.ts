import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionTimerComponent } from './auction-timer.component';

describe('AuctionTimerComponent', () => {
  let component: AuctionTimerComponent;
  let fixture: ComponentFixture<AuctionTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
