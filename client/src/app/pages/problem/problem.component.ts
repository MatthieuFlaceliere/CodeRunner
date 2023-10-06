import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss'],
})
export class ProblemComponent {
  private routeSub!: Subscription;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      console.log(params); //log the entire params object
      console.log(params['problem-id']); //log the value of id
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
