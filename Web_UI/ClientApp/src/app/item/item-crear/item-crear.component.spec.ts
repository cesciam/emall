import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCrearComponent } from './item-crear.component';

describe('ItemCrearComponent', () => {
  let component: ItemCrearComponent;
  let fixture: ComponentFixture<ItemCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
