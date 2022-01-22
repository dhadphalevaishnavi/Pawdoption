import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMyAddedPetsComponent } from './show-my-added-pets.component';

describe('ShowMyAddedPetsComponent', () => {
  let component: ShowMyAddedPetsComponent;
  let fixture: ComponentFixture<ShowMyAddedPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMyAddedPetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMyAddedPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
