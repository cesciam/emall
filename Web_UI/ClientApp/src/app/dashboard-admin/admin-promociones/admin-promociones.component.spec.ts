import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromocionesComponent } from './admin-promociones.component';

describe('AdminPromocionesComponent', () => {
  let component: AdminPromocionesComponent;
  let fixture: ComponentFixture<AdminPromocionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPromocionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
