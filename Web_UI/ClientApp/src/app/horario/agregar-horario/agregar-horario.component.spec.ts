import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHorarioComponent } from './agregar-horario.component';

describe('AgregarHorarioComponent', () => {
  let component: AgregarHorarioComponent;
  let fixture: ComponentFixture<AgregarHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
