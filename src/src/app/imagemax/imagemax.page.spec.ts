import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemaxPage } from './imagemax.page';

describe('ImagemaxPage', () => {
  let component: ImagemaxPage;
  let fixture: ComponentFixture<ImagemaxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagemaxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagemaxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
