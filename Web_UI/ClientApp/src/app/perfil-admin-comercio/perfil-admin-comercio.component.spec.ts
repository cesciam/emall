import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAdminComercioComponent } from './perfil-admin-comercio.component';

describe('PerfilAdminComercioComponent', () => {
  let component: PerfilAdminComercioComponent;
  let fixture: ComponentFixture<PerfilAdminComercioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilAdminComercioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAdminComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
