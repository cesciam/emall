import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartComercioComponent } from './pie-chart-comercio.component';

describe('PieChartComercioComponent', () => {
  let component: PieChartComercioComponent;
  let fixture: ComponentFixture<PieChartComercioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartComercioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
