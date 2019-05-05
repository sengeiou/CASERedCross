import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonePage } from './phone.page';

describe('PhonePage', () => {
  let component: PhonePage;
  let fixture: ComponentFixture<PhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
