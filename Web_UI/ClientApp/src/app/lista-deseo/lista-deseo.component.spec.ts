import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeseoComponent } from './lista-deseo.component';

describe('ListaDeseoComponent', () => {
  let component: ListaDeseoComponent;
  let fixture: ComponentFixture<ListaDeseoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeseoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
