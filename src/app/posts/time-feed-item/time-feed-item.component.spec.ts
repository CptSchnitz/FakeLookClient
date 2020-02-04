import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFeedItemComponent } from './time-feed-item.component';

describe('TimeFeedItemComponent', () => {
  let component: TimeFeedItemComponent;
  let fixture: ComponentFixture<TimeFeedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeFeedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeFeedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
