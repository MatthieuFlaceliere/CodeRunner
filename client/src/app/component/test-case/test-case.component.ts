import { Component, Input } from '@angular/core';
import { IProblem, ITestCaseResult } from 'src/app/models/problem';
import { ProblemService } from 'src/app/service/problem.service';

@Component({
  selector: 'app-test-case',
  template: `
    <div class="card-body">
      <div *ngFor="let testCase of testCases" class="test-box">
        <button
          class="accordion-header"
          [ngClass]="{ active: testCase.active }"
          (click)="testCase.active = !testCase.active"
        >
          <h4>Test case {{ testCase.index }}</h4>
          <span *ngIf="testCase.success != null">{{ testCase.success ? '✅' : '❌' }}</span>
        </button>
        <div class="accordion-body" [ngClass]="{ active: testCase.active }">
          <div>
            <h5>Input</h5>
            <code>{{ testCase.input | json }}</code>
          </div>
          <div>
            <h5>Expected</h5>
            <code>{{ testCase.expectedOutput | json }}</code>
          </div>
          <div *ngIf="testCase.output != ''">
            <h5>Output</h5>
            <code>{{ testCase.output }}</code>
          </div>
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
      h5 {
        margin: 0;
      }
      .test-box {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        margin-bottom: 0.5rem;
        border: 1px solid white;
        border-radius: 0.5rem;
      }
      .test-box .accordion-header {
        text-align: left;
        border: 0px;
        background: #002240;
        color: white;
        padding: 0.6rem 1rem;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        border-radius: 0.5rem;
        &:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        &.active {
          border-bottom: 1px solid white;
          border-radius: 0.5rem 0.5rem 0 0;
        }
        h4,
        span {
          font-size: 16px;
          line-height: 16px;
        }
      }
      .test-box .accordion-body {
        height: 0px;
        overflow: hidden;
        margin: 0;
        &.active {
          height: auto;
          margin: 0.5rem 0rem 0.8rem 1rem;
        }
        div {
          display: flex;
          flex-direction: row;
          margin-bottom: 0.5rem;
        }
        code {
          margin-left: 0.8rem;
          background: #002240;
          border-radius: 0.5rem;
          padding: 0.1rem 0.5rem;
          line-height: 14px;
        }
      }
    `,
  ],
})
export class TestCaseComponent {
  testCases: {
    input: object;
    expectedOutput: object;
    active: boolean;
    success: boolean | null;
    index: number;
    output: string;
  }[] = [];

  constructor(private readonly problemService: ProblemService) {
    this.problemService.problem$.subscribe((problem: IProblem) => {
      problem.testCases.forEach((testCase, index) => {
        this.testCases.push({
          input: testCase.input,
          expectedOutput: testCase.output,
          active: false,
          success: null,
          index: index + 1,
          output: '',
        });
      });
    });

    this.problemService.testCodeResult$.subscribe((res) => {
      const data: ITestCaseResult = JSON.parse(res.data);

      if (data.code === 0) {
        this.testCases.forEach((testCase) => {
          if (data.test_case[testCase.index].result === 'PASSED') {
            testCase.success = true;
            testCase.output = data.test_case[testCase.index].output;
          } else if (data.test_case[testCase.index].result === 'FAILED') {
            testCase.success = false;
            testCase.output = data.test_case[testCase.index].output;
          }
        });
      }
    });
  }
}
