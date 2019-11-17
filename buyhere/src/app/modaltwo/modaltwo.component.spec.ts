import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltwoPage } from './modaltwo.page';

describe('ModaltwoPage', () => {
  let component: ModaltwoPage;
  let fixture: ComponentFixture<ModaltwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaltwoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaltwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
