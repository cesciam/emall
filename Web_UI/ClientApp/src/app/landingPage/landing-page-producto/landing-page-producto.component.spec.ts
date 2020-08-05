import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageProductoComponent } from './landing-page-producto.component';

describe('LandingPageProductoComponent', () => {
  let component: LandingPageProductoComponent;
  let fixture: ComponentFixture<LandingPageProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
