import { Component, Input } from '@angular/core';
import { IProblem } from 'src/app/models/problem';
import { ProblemService } from 'src/app/service/problem.service';

@Component({
  selector: 'app-test-case',
  template: `
    <div class="card-body">
      <div *ngFor="let testCase of testCases; let i = index" class="test-box">
        <h4>Test {{ i }}</h4>
        <div>
          <h5>Input</h5>
          <p>{{ testCase.input | json }}</p>
        </div>
        <div>
          <h5>Output</h5>
          <p>{{ testCase.output | json }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        overflow-y: scroll;
      }
      .card-body {
        padding: 0.5rem;
        overflow: auto;
      }
      h4,
      h5,
      pre,
      p {
        margin: 0;
      }
      .test-box {
        margin-bottom: 1rem;
        h4 {
          margin-bottom: 0.5rem;
        }
      }
      .test-box div {
        display: flex;
        flex-direction: row;
        margin: 0px 0px 0px 1rem;
        h5 {
          margin-right: 0.5rem;
        }
        p {
          line-height: 19px;
        }
      }
    `,
  ],
})
export class TestCaseComponent {
  testCases: { input: object; output: string }[] = [];

  constructor(private readonly problemService: ProblemService) {
    this.problemService.problem$.subscribe((problem: IProblem) => {
      this.testCases = problem.testCases;
    });
  }
}
