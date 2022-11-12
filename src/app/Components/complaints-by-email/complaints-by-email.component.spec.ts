import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsByEmailComponent } from './complaints-by-email.component';

describe('ComplaintsByEmailComponent', () => {
  let component: ComplaintsByEmailComponent;
  let fixture: ComponentFixture<ComplaintsByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsByEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
