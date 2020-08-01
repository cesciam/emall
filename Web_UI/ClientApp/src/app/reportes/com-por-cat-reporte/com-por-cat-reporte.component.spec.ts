import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComPorCatReporteComponent } from './com-por-cat-reporte.component';

describe('ComPorCatReporteComponent', () => {
  let component: ComPorCatReporteComponent;
  let fixture: ComponentFixture<ComPorCatReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComPorCatReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComPorCatReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
