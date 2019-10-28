import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Super14Page } from './super14.page';

describe('Super14Page', () => {
  let component: Super14Page;
  let fixture: ComponentFixture<Super14Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Super14Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Super14Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
