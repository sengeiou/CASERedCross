import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyvisitPage } from './modifyvisit.page';

describe('ModifyvisitPage', () => {
  let component: ModifyvisitPage;
  let fixture: ComponentFixture<ModifyvisitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyvisitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyvisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
