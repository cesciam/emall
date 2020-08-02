import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComercioComponent } from './cards-comercio.component';

describe('CardsComercioComponent', () => {
  let component: CardsComercioComponent;
  let fixture: ComponentFixture<CardsComercioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsComercioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
