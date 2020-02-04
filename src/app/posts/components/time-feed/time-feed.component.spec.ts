import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFeedComponent } from './time-feed.component';

describe('TimeFeedComponent', () => {
  let component: TimeFeedComponent;
  let fixture: ComponentFixture<TimeFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
