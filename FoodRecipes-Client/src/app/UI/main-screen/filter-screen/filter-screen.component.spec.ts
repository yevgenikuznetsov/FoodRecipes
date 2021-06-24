import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterScreenComponent } from './filter-screen.component';

describe('FilterScreenComponent', () => {
  let component: FilterScreenComponent;
  let fixture: ComponentFixture<FilterScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
