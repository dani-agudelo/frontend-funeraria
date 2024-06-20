import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosLayoutComponent } from './servicios-layout.component';

describe('ServiciosLayoutComponent', () => {
  let component: ServiciosLayoutComponent;
  let fixture: ComponentFixture<ServiciosLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
