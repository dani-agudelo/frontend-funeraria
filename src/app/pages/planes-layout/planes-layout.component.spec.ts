import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesLayoutComponent } from './planes-layout.component';

describe('PlanesLayoutComponent', () => {
  let component: PlanesLayoutComponent;
  let fixture: ComponentFixture<PlanesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
