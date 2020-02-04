import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapFeedComponent } from './map-feed.component';

describe('MapFeedComponent', () => {
  let component: MapFeedComponent;
  let fixture: ComponentFixture<MapFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
