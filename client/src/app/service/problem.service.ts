import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IProblem } from '../models/problem';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProblemService {
  problem$: Subject<IProblem> = new Subject<IProblem>();

  constructor(private http: HttpClient) {}

  getProblems(): Observable<IProblem[]> {
    return this.http.get<IProblem[]>(environment.apiBaseUrl + '/problems');
  }

  getProblem(id: string): Subject<IProblem> {
    this.http.get<IProblem>(environment.apiBaseUrl + '/problem/' + id).subscribe({
      next: (res) => {
        this.problem$.next(res);
      },
      error: (err) => {
        this.problem$.error(err);
      },
    });

    return this.problem$;
  }
}
