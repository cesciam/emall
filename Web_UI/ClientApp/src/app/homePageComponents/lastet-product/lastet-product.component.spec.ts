import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastetProductComponent } from './lastet-product.component';

describe('LastetProductComponent', () => {
  let component: LastetProductComponent;
  let fixture: ComponentFixture<LastetProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastetProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastetProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
