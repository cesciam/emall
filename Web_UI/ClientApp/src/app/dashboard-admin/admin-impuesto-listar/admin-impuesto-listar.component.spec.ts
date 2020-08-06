import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImpuestoListarComponent } from './admin-impuesto-listar.component';

describe('AdminImpuestoListarComponent', () => {
  let component: AdminImpuestoListarComponent;
  let fixture: ComponentFixture<AdminImpuestoListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminImpuestoListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminImpuestoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
