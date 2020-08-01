import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemServicioComponent } from './item-servicio.component';

describe('ItemServicioComponent', () => {
  let component: ItemServicioComponent;
  let fixture: ComponentFixture<ItemServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
