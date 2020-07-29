import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPromocionComponent } from './editar-promocion.component';

describe('EditarPromocionComponent', () => {
  let component: EditarPromocionComponent;
  let fixture: ComponentFixture<EditarPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
