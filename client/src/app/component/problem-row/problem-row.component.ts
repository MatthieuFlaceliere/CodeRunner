import { I18nPluralPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProblem } from 'src/app/models/problem';

@Component({
  selector: 'app-problem-row',
  template: `
    <div class="row" [ngClass]="index % 2 === 0 ? 'light' : 'dark'" *ngIf="!skeleton">
      <div class="col-4">{{ problem.title }}</div>
      <div class="col-4" [appDifficultyColor]="problem.difficulty">{{ problem.difficulty }}</div>
      <div class="col-4">
        <!-- Display max 2 tags -->
        <span
          *ngFor="let tag of problem.tags; let i = index"
          class="badge"
          [ngStyle]="{ display: i >= 2 ? 'none' : 'inline' }"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <div class="row" [ngClass]="index % 2 === 0 ? 'light' : 'dark'" *ngIf="skeleton">
      <div class="col-4">
        <ngx-skeleton-loader
          [count]="1"
          [appearance]="appearance"
          [animation]="animation"
          [theme]="theme"
        ></ngx-skeleton-loader>
      </div>
      <div class="col-4">
        <ngx-skeleton-loader
          [count]="1"
          [appearance]="appearance"
          [animation]="animation"
          [theme]="theme"
        ></ngx-skeleton-loader>
      </div>
      <div class="col-4">
        <ngx-skeleton-loader
          [count]="1"
          [appearance]="appearance"
          [animation]="animation"
          [theme]="theme"
        ></ngx-skeleton-loader>
      </div>
    </div>
  `,
  styles: [
    `
      .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.7rem 0;
        width: 100%;
        color: var(--color-primary);
        background-color: var(--primary);
        cursor: pointer;
        div {
          padding: 0 0.7rem;
          height: 24px;
        }
      }
      .col-4 {
        width: 33.33%;
      }
      .light {
        background-color: var(--code-editor-bg);
      }
      .dark {
        background-color: var(--primary);
      }
      .badge {
        padding-top: 0.125rem;
        padding-bottom: 0.125rem;
        padding-left: 0.625rem;
        padding-right: 0.625rem;
        margin-right: 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        line-height: 1rem;
        font-weight: 500;
        color: #fff;
        background-color: #23314b;
      }
    `,
  ],
})
export class ProblemRowComponent {
  @Input() problem: IProblem = {} as IProblem;
  @Input() index!: number;
  @Input() skeleton = false;

  animation = 'pulse';
  appearance: '' | 'circle' | 'line' | 'custom-content' = 'line';
  theme = {
    'background-color': 'rgba(183, 183, 183, 0.14)',
    height: '24px',
    margin: '0px',
  };

  constructor() {}
}
