import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromocionesEditComponent } from './admin-promociones-edit.component';

describe('AdminPromocionesEditComponent', () => {
  let component: AdminPromocionesEditComponent;
  let fixture: ComponentFixture<AdminPromocionesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPromocionesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPromocionesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
