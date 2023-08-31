import { Injectable } from '@angular/core';
import { Code, ResultCodeSuccess, RunCodeSuccess } from '../models/code';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  constructor(private readonly http: HttpClient) {}

  runCode(code: Code): Observable<RunCodeSuccess> {
    return this.http.post<RunCodeSuccess>('http://localhost:3000/api/code/run', code);
  }

  getCodeResult(url: string): Observable<ResultCodeSuccess> {
    return this.http.get<ResultCodeSuccess>(url);
  }
}
