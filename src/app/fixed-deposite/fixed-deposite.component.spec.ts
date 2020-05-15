import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedDepositeComponent } from './fixed-deposite.component';

describe('FixedDepositeComponent', () => {
  let component: FixedDepositeComponent;
  let fixture: ComponentFixture<FixedDepositeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedDepositeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedDepositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
