import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhrPage } from './whr.page';

describe('WhrPage', () => {
  let component: WhrPage;
  let fixture: ComponentFixture<WhrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
