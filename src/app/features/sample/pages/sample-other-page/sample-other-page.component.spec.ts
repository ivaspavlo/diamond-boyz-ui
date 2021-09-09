import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleOtherPageComponent } from './sample-other-page.component';

describe('SampleOtherPageComponent', () => {
  let component: SampleOtherPageComponent;
  let fixture: ComponentFixture<SampleOtherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleOtherPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleOtherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
