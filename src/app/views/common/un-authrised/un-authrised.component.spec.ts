import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthrisedComponent } from './un-authrised.component';

describe('UnAuthrisedComponent', () => {
  let component: UnAuthrisedComponent;
  let fixture: ComponentFixture<UnAuthrisedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAuthrisedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAuthrisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
