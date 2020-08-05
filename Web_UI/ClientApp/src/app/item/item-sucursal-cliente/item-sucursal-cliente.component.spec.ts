import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSucursalClienteComponent } from './item-sucursal-cliente.component';

describe('ItemSucursalClienteComponent', () => {
  let component: ItemSucursalClienteComponent;
  let fixture: ComponentFixture<ItemSucursalClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSucursalClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSucursalClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
