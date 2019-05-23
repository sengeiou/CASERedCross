import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WangluoPage } from './wangluo.page';

describe('WangluoPage', () => {
  let component: WangluoPage;
  let fixture: ComponentFixture<WangluoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WangluoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WangluoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
