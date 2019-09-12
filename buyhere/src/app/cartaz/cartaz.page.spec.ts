import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartazPage } from './cartaz.page';

describe('CartazPage', () => {
  let component: CartazPage;
  let fixture: ComponentFixture<CartazPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartazPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartazPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
