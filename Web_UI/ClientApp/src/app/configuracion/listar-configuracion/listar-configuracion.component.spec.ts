import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarConfiguracionComponent } from './listar-configuracion.component';

describe('ListarConfiguracionComponent', () => {
  let component: ListarConfiguracionComponent;
  let fixture: ComponentFixture<ListarConfiguracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarConfiguracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
