import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarComercioComponent } from './modificar-comercio.component';

describe('ModificarComercioComponent', () => {
  let component: ModificarComercioComponent;
  let fixture: ComponentFixture<ModificarComercioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarComercioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
