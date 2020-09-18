import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D1000Component } from './d1000.component';

describe('D1000Component', () => {
  let component: D1000Component;
  let fixture: ComponentFixture<D1000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D1000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D1000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
