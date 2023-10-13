import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProblem } from 'src/app/models/problem';
import { ProblemService } from 'src/app/service/problem.service';

@Component({
  selector: 'app-problem-selection',
  templateUrl: './problem-selection.component.html',
  styleUrls: ['./problem-selection.component.scss'],
})
export class ProblemSelectionComponent {
  problems: IProblem[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private readonly problemService: ProblemService,
    private readonly router: Router,
  ) {
    this.problemService.getProblems().subscribe({
      next: (problems) => {
        this.problems = problems;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Oups, an error occured while loading the problems. Please try again later.';
        this.loading = false;
      },
    });
  }

  selectProblem(problem: IProblem) {
    this.router.navigate(['/problem', problem._id]);
  }
}
