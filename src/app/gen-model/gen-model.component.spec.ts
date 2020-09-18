import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenModelComponent } from './gen-model.component';

describe('GenModelComponent', () => {
  let component: GenModelComponent;
  let fixture: ComponentFixture<GenModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
