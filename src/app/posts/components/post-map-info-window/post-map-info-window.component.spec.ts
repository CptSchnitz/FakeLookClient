import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMapInfoWindowComponent } from './post-map-info-window.component';

describe('PostMapInfoWindowComponent', () => {
  let component: PostMapInfoWindowComponent;
  let fixture: ComponentFixture<PostMapInfoWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMapInfoWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMapInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
