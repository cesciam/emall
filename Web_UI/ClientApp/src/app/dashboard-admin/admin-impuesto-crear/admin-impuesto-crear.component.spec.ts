import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImpuestoCrearComponent } from './admin-impuesto-crear.component';

describe('AdminImpuestoCrearComponent', () => {
  let component: AdminImpuestoCrearComponent;
  let fixture: ComponentFixture<AdminImpuestoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminImpuestoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminImpuestoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
