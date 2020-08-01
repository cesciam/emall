import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPerfilComponent } from './item-perfil.component';

describe('ItemPerfilComponent', () => {
  let component: ItemPerfilComponent;
  let fixture: ComponentFixture<ItemPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
