import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonDownloadComponent } from './json-download.component';

describe('JsonDownloadComponent', () => {
  let component: JsonDownloadComponent;
  let fixture: ComponentFixture<JsonDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
