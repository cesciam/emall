import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPromocionComponent } from './listar-promocion.component';

describe('ListarPromocionComponent', () => {
  let component: ListarPromocionComponent;
  let fixture: ComponentFixture<ListarPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
