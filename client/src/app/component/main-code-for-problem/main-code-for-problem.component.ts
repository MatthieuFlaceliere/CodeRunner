import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { defaultEditorOptions, defaultTheme } from 'src/app/config/code-editor';
import { Language, LanguagesList } from 'src/app/models/languages';
import { IProblem } from 'src/app/models/problem';
import { CodeService } from 'src/app/service/code.service';
import { ProblemService } from 'src/app/service/problem.service';

@Component({
  selector: 'app-main-code-for-problem',
  template: `
    <div class="card-header">
      <app-select-language
        (onLanguageChange)="onLanguageChange($event)"
        [disabled]="code == null"
      ></app-select-language>
      <app-run-button (click)="runTests()" [disabled]="code == null"></app-run-button>
    </div>
    <ngx-monaco-editor
      *ngIf="code"
      [options]="editorOptions"
      [(ngModel)]="code"
      (onInit)="onEditorInit()"
    ></ngx-monaco-editor>
  `,
  styles: [
    `
      ngx-monaco-editor {
        flex-grow: 1;
      }
    `,
  ],
})
export class MainCodeForProblemComponent {
  languagesList: Language[] = LanguagesList;
  selectedLanguage: Language = this.languagesList[0];

  editorOptions = {
    ...defaultEditorOptions,
    language: this.selectedLanguage.key,
  };

  solutions: { language: string; code: string }[] = [];
  code: string | null = null;

  constructor(private readonly problemService: ProblemService) {
    this.problemService.problem$.subscribe({
      next: (problem) => {
        this.code = problem.solutions.find((solution) => solution.language === this.selectedLanguage.key)?.code || '';
        this.solutions = problem.solutions;
      },
      error: (err) => console.log(err),
    });
  }

  onEditorInit() {
    (<any>window).monaco.editor.defineTheme('default', defaultTheme);
    (<any>window).monaco.editor.setTheme('default');
  }

  onLanguageChange(language: Language) {
    this.selectedLanguage = language;
    this.editorOptions = {
      ...this.editorOptions,
      language: this.selectedLanguage.key,
    };
    this.code = this.solutions.find((solution) => solution.language === this.selectedLanguage.key)?.code || '';
  }

  runTests() {}
}
