import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IProblem } from '../models/problem';
import { environment } from 'src/environments/environment.development';
import { RunCodeSuccess } from '../models/code';

@Injectable({
  providedIn: 'root',
})
export class ProblemService {
  problem$: Subject<IProblem> = new Subject<IProblem>();

  loadingTestCode = false;
  loadingTestCode$: Subject<boolean> = new Subject<boolean>();

  testCodeResult$: Subject<RunCodeSuccess> = new Subject<RunCodeSuccess>();

  constructor(private http: HttpClient) {
    this.loadingTestCode$.subscribe((loading) => (this.loadingTestCode = loading));
  }

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

  testCodeForProblem(id: string, src: string, lang: string): void {
    if (this.loadingTestCode) return;

    this.toogleLoadingTestCode();
    this.http.post<RunCodeSuccess>(environment.apiBaseUrl + '/problem/' + id + '/testcode', { src, lang }).subscribe({
      next: (res) => {
        this.getCodeResult(res.data);
      },
      error: (err) => {
        this.testCodeResult$.error(err);
        this.toogleLoadingTestCode();
      },
    });
  }

  getCodeResult(url: string) {
    this.http.get<RunCodeSuccess>(url).subscribe({
      next: (res) => {
        if (res.data === null) {
          setTimeout(() => this.getCodeResult(url), 1000);
        } else {
          this.testCodeResult$.next(res);
          this.toogleLoadingTestCode();
        }
      },
      error: (err) => {
        this.toogleLoadingTestCode();
      },
    });
  }

  private toogleLoadingTestCode() {
    this.loadingTestCode$.next(!this.loadingTestCode);
  }
}
