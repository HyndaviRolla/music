import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPlayListComponent } from './recent-play-list.component';

describe('RecentPlayListComponent', () => {
  let component: RecentPlayListComponent;
  let fixture: ComponentFixture<RecentPlayListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentPlayListComponent]
    });
    fixture = TestBed.createComponent(RecentPlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
