import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneIndicatorComponent } from './done-indicator.component';

describe('DoneIndicatorComponent', () => {
  let component: DoneIndicatorComponent;
  let fixture: ComponentFixture<DoneIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
