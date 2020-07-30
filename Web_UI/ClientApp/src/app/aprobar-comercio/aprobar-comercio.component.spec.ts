import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarComercioComponent } from './aprobar-comercio.component';

describe('AprobarComercioComponent', () => {
  let component: AprobarComercioComponent;
  let fixture: ComponentFixture<AprobarComercioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarComercioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
