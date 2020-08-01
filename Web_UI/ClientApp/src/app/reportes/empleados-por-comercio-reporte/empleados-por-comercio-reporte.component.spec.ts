import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosPorComercioReporteComponent } from './empleados-por-comercio-reporte.component';

describe('EmpleadosPorComercioReporteComponent', () => {
  let component: EmpleadosPorComercioReporteComponent;
  let fixture: ComponentFixture<EmpleadosPorComercioReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadosPorComercioReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadosPorComercioReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
