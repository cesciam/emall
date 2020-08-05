import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromocionesRegistrarComponent } from './admin-promociones-registrar.component';

describe('AdminPromocionesRegistrarComponent', () => {
  let component: AdminPromocionesRegistrarComponent;
  let fixture: ComponentFixture<AdminPromocionesRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPromocionesRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPromocionesRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
