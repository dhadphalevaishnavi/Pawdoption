import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsolvedComplaintsComponent } from './unsolved-complaints.component';

describe('UnsolvedComplaintsComponent', () => {
  let component: UnsolvedComplaintsComponent;
  let fixture: ComponentFixture<UnsolvedComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsolvedComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsolvedComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
