import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarImpuestoComponent } from './listar-impuesto.component';

describe('ListarImpuestoComponent', () => {
  let component: ListarImpuestoComponent;
  let fixture: ComponentFixture<ListarImpuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarImpuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarImpuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
