import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInterestedUsersComponent } from './show-interested-users.component';

describe('ShowInterestedUsersComponent', () => {
  let component: ShowInterestedUsersComponent;
  let fixture: ComponentFixture<ShowInterestedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInterestedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInterestedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
