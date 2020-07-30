import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSucursalComponent } from './item-sucursal.component';

describe('ItemSucursalComponent', () => {
  let component: ItemSucursalComponent;
  let fixture: ComponentFixture<ItemSucursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
