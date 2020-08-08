import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriaListarComponent } from './admin-categoria-listar.component';

describe('AdminCategoriaListarComponent', () => {
  let component: AdminCategoriaListarComponent;
  let fixture: ComponentFixture<AdminCategoriaListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoriaListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoriaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
