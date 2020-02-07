import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTagsControlComponent } from './user-tags-control.component';

describe('UserTagsControlComponent', () => {
  let component: UserTagsControlComponent;
  let fixture: ComponentFixture<UserTagsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTagsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTagsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
