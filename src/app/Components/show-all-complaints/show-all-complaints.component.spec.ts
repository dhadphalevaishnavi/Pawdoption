import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllComplaintsComponent } from './show-all-complaints.component';

describe('ShowAllComplaintsComponent', () => {
  let component: ShowAllComplaintsComponent;
  let fixture: ComponentFixture<ShowAllComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
