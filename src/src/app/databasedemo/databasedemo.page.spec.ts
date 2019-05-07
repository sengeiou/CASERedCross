import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabasedemoPage } from './databasedemo.page';

describe('DatabasedemoPage', () => {
  let component: DatabasedemoPage;
  let fixture: ComponentFixture<DatabasedemoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabasedemoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabasedemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
