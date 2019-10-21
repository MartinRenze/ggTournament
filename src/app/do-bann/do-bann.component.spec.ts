import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoBannComponent } from './do-bann.component';

describe('DoBannComponent', () => {
  let component: DoBannComponent;
  let fixture: ComponentFixture<DoBannComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoBannComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoBannComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
