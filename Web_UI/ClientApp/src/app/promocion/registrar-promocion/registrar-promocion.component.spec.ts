import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPromocionComponent } from './registrar-promocion.component';

describe('RegistrarPromocionComponent', () => {
  let component: RegistrarPromocionComponent;
  let fixture: ComponentFixture<RegistrarPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
