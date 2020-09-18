import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLoginComponent } from './school-login.component';

describe('SchoolLoginComponent', () => {
  let component: SchoolLoginComponent;
  let fixture: ComponentFixture<SchoolLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
