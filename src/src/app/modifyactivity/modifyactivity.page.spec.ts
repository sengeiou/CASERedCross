import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyactivityPage } from './modifyactivity.page';

describe('ModifyactivityPage', () => {
  let component: ModifyactivityPage;
  let fixture: ComponentFixture<ModifyactivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyactivityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyactivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
