import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEmpleadoComponent } from './item-empleado.component';

describe('ItemEmpleadoComponent', () => {
  let component: ItemEmpleadoComponent;
  let fixture: ComponentFixture<ItemEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
