import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarComercioComponent } from './registrar-comercio.component';

describe('RegistrarComercioComponent', () => {
  let component: RegistrarComercioComponent;
  let fixture: ComponentFixture<RegistrarComercioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarComercioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
