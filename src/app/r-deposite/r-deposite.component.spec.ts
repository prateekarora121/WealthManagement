import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDepositeComponent } from './r-deposite.component';

describe('RDepositeComponent', () => {
  let component: RDepositeComponent;
  let fixture: ComponentFixture<RDepositeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDepositeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDepositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
