import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunButtonComponent } from './run-button.component';

describe('RunButtonComponent', () => {
  let component: RunButtonComponent;
  let fixture: ComponentFixture<RunButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RunButtonComponent]
    });
    fixture = TestBed.createComponent(RunButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
