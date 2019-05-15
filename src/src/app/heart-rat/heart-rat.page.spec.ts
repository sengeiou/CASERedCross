import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartRatPage } from './heart-rat.page';

describe('HeartRatPage', () => {
  let component: HeartRatPage;
  let fixture: ComponentFixture<HeartRatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartRatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartRatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
