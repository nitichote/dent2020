import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsAddComponent } from './goods-add.component';

describe('GoodsAddComponent', () => {
  let component: GoodsAddComponent;
  let fixture: ComponentFixture<GoodsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
