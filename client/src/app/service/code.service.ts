import { Injectable } from '@angular/core';
import { Code, CodeResult, ResultCodeSuccess, RunCodeSuccess } from '../models/code';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  output!: CodeResult;
  loading = false;

  output$: Subject<CodeResult> = new Subject<CodeResult>();
  loading$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly http: HttpClient) {
    this.output$.subscribe((output) => (this.output = output));
    this.loading$.subscribe((loading) => (this.loading = loading));
  }

  runCode(code: Code): void {
    // If the code is already running, don't run it again
    if (this.loading) return;

    this.toogleLoading();
    this.http.post<RunCodeSuccess>(environment.apiBaseUrl + '/code/run', code).subscribe({
      next: (res) => {
        this.getCodeResult(res.data);
      },
      error: (err) => {
        this.setOutput({
          stdout: '',
          stderr: 'Something went wrong\n Please try again later',
          code: 1,
        });
        this.toogleLoading();
      },
    });
  }

  getCodeResult(url: string) {
    this.http.get<ResultCodeSuccess>(environment.apiBaseUrl + url).subscribe({
      next: (res) => {
        if (res.data === null) {
          setTimeout(() => this.getCodeResult(url), 1000);
        } else {
          const codeOutput: CodeResult = JSON.parse(res.data);
          this.setOutput(codeOutput);
          this.toogleLoading();
        }
      },
      error: (err) => {
        this.setOutput({
          stdout: '',
          stderr: 'Something went wrong\n Please try again later',
          code: 1,
        });
        this.toogleLoading();
      },
    });
  }

  toogleLoading() {
    this.loading$.next(!this.loading);
  }

  setOutput(output: CodeResult) {
    this.output$.next(output);
  }
}
