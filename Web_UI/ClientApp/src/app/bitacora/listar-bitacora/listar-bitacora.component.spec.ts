import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBitacoraComponent } from './listar-bitacora.component';

describe('ListarBitacoraComponent', () => {
  let component: ListarBitacoraComponent;
  let fixture: ComponentFixture<ListarBitacoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarBitacoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
