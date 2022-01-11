import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPetSidebarComponent } from './add-pet-sidebar.component';

describe('AddPetSidebarComponent', () => {
  let component: AddPetSidebarComponent;
  let fixture: ComponentFixture<AddPetSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPetSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPetSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
