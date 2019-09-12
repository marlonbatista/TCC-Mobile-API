import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavegnagoPage } from './savegnago.page';

describe('SavegnagoPage', () => {
  let component: SavegnagoPage;
  let fixture: ComponentFixture<SavegnagoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavegnagoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavegnagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
