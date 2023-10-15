import { Component, Input } from '@angular/core';
import { IProblem } from 'src/app/models/problem';
import { ProblemService } from 'src/app/service/problem.service';

@Component({
  selector: 'app-test-case',
  template: `
    <div class="card-body">
      <div *ngFor="let testCase of testCases; let i = index" class="test-box">
        <button class="accordion-header" (click)="testCase.active = !testCase.active">
          <h4>Test case {{ i + 1 }}</h4>
          <span *ngIf="testCase.success != null">{{ testCase.success ? '✅' : '❌' }}</span>
        </button>
        <div class="accordion-body" [ngClass]="{ active: testCase.active }">
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
        display: flex;
        flex-direction: column;
        margin-bottom: 0.5rem;
        border: 1px solid white;
      }
      .test-box .accordion-header {
        text-align: left;
        border: 0px;
        border-bottom: 1px solid white;
        background: #002240;
        color: white;
        padding: 0.6rem 1rem;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        &:hover {
          background: rgba(255, 255, 255, 0.08);
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
        }
        p {
          line-height: 19px;
          margin-left: 0.8rem;
        }
      }
    `,
  ],
})
export class TestCaseComponent {
  testCases: { input: object; output: object; active: boolean; success: boolean | null }[] = [];

  constructor(private readonly problemService: ProblemService) {
    this.problemService.problem$.subscribe((problem: IProblem) => {
      problem.testCases.forEach((testCase) => {
        this.testCases.push({ ...testCase, active: false, success: null });
      });
    });

    this.problemService.testCodeResult$.subscribe((res) => {
      console.log(res);
      this.testCases.forEach((testCase, index) => {
        testCase.success = true;
      });
    });
  }
}
