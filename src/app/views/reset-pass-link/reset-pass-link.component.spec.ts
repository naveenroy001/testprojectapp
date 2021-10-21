import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassLinkComponent } from './reset-pass-link.component';

describe('ResetPassLinkComponent', () => {
  let component: ResetPassLinkComponent;
  let fixture: ComponentFixture<ResetPassLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPassLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPassLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
