import { Component, OnInit } from '@angular/core';
import { defaultEditorOptions, defaultTheme } from 'src/app/config/code-editor';
import { Language, LanguagesList } from 'src/app/models/languages';
import { CodeService } from 'src/app/service/code.service';

@Component({
  selector: 'app-main-code',
  template: `
    <div class="card-header">
      <app-select-language (onLanguageChange)="onLanguageChange($event)"></app-select-language>
      <app-run-button (click)="runCode()"></app-run-button>
    </div>
    <ngx-monaco-editor [options]="editorOptions" [(ngModel)]="code" (onInit)="onEditorInit()"></ngx-monaco-editor>
  `,
  styles: [
    `
      ngx-monaco-editor {
        flex-grow: 1;
      }
    `,
  ],
})
export class MainCodeComponent implements OnInit {
  languagesList: Language[] = LanguagesList;
  selectedLanguage: Language = this.languagesList[0];

  editorOptions = {
    ...defaultEditorOptions,
    language: this.selectedLanguage.key,
  };

  _code!: string;

  constructor(private readonly codeService: CodeService) {}

  ngOnInit(): void {
    this.code = this.selectedLanguage.code;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
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
    this.code = this.selectedLanguage.code;
  }

  runCode() {
    this.codeService.runCode({ src: this.code, lang: this.selectedLanguage.key });
  }
}
