import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSelectionComponent } from './problem-selection.component';

describe('ProblemSelectionComponent', () => {
  let component: ProblemSelectionComponent;
  let fixture: ComponentFixture<ProblemSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProblemSelectionComponent]
    });
    fixture = TestBed.createComponent(ProblemSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
