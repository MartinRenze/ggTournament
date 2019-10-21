import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindStartTimeComponent } from './find-start-time.component';

describe('FindStartTimeComponent', () => {
  let component: FindStartTimeComponent;
  let fixture: ComponentFixture<FindStartTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindStartTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindStartTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
