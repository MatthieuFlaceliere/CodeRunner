import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IProblem } from 'src/app/models/problem';
import { ProblemService } from 'src/app/service/problem.service';

@Component({
  selector: 'app-problem-description',
  template: `
    <div class="card-header" *ngIf="title">{{ title }}</div>
    <div class="card-body" *ngIf="description" [innerHTML]="description"></div>

    <div class="card-header" *ngIf="!title">
      <ngx-skeleton-loader
        [count]="1"
        [appearance]="appearance"
        [animation]="animation"
        [theme]="themeTitle"
      ></ngx-skeleton-loader>
    </div>
    <div class="card-body" *ngIf="!description">
      <ngx-skeleton-loader
        [count]="5"
        [appearance]="appearance"
        [animation]="animation"
        [theme]="themeDescription"
      ></ngx-skeleton-loader>
    </div>
  `,
  styles: [
    `
      .card-body {
        padding: 0 0.5rem;
      }
      .card-header ngx-skeleton-loader {
        width: 30%;
        display: flex;
        align-items: center;
      }
    `,
  ],
})
export class ProblemDescriptionComponent {
  title: string | null = null;
  description: string | null = null;

  animation = 'pulse';
  appearance: '' | 'circle' | 'line' | 'custom-content' = 'line';
  themeTitle = {
    'background-color': 'rgba(183, 183, 183, 0.14)',
    height: '25px',
    margin: '0px',
  };
  themeDescription = {
    'background-color': 'rgba(183, 183, 183, 0.14)',
    height: '25px',
    margin: '10px 0px',
  };

  constructor(problemService: ProblemService) {
    problemService.problem$.subscribe({
      next: (problem) => {
        this.title = problem.title + ' description';
        this.description = problem.description;
      },
      error: (err) => {
        this.title = 'Error';
        this.description = ' ';
      },
    });
  }
}
