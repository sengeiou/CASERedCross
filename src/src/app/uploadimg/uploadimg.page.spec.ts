import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadimgPage } from './uploadimg.page';

describe('UploadimgPage', () => {
  let component: UploadimgPage;
  let fixture: ComponentFixture<UploadimgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadimgPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadimgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
