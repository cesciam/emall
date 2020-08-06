import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriaCrearComponent } from './admin-categoria-crear.component';

describe('AdminCategoriaCrearComponent', () => {
  let component: AdminCategoriaCrearComponent;
  let fixture: ComponentFixture<AdminCategoriaCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoriaCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoriaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
