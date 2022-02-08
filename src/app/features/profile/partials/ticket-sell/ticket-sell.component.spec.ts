import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSellComponent } from './ticket-sell.component';

describe('TicketSellComponent', () => {
  let component: TicketSellComponent;
  let fixture: ComponentFixture<TicketSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
