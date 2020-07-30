import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearImpuestoComponent } from './crear-impuesto.component';

describe('CrearImpuestoComponent', () => {
  let component: CrearImpuestoComponent;
  let fixture: ComponentFixture<CrearImpuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearImpuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearImpuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
