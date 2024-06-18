import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PQRComponent } from './pqr.component';

describe('PQRComponent', () => {
  let component: PQRComponent;
  let fixture: ComponentFixture<PQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PQRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
