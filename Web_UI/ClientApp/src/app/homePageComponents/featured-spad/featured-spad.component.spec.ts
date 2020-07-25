import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedSpadComponent } from './featured-spad.component';

describe('FeaturedSpadComponent', () => {
  let component: FeaturedSpadComponent;
  let fixture: ComponentFixture<FeaturedSpadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedSpadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedSpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
