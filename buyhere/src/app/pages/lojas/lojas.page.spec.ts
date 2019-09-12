import { LojasPage } from './lojas.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('LojasPage', () => {
  let component: LojasPage;
  let fixture: ComponentFixture<LojasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LojasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LojasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
