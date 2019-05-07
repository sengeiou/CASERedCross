import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartdemoPage } from './chartdemo.page';

describe('ChartdemoPage', () => {
  let component: ChartdemoPage;
  let fixture: ComponentFixture<ChartdemoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartdemoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartdemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
