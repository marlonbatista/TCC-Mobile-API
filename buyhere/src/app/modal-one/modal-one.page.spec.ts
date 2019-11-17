import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOnePage } from './modal-one.page';

describe('ModalOnePage', () => {
  let component: ModalOnePage;
  let fixture: ComponentFixture<ModalOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOnePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
