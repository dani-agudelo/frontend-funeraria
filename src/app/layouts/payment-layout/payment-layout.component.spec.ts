import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLayoutComponent } from './payment-layout.component';

describe('PaymentLayoutComponent', () => {
  let component: PaymentLayoutComponent;
  let fixture: ComponentFixture<PaymentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
