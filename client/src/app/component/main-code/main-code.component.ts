import { Component } from '@angular/core';
import { CodeResult } from 'src/app/models/code';
import { Language, LanguagesList } from 'src/app/models/languages';
import { CodeService } from 'src/app/service/code.service';

@Component({
  selector: 'app-main-code',
  template: `
    <div class="header">
      <app-select-language (onLanguageChange)="onLanguageChange($event)"></app-select-language>
      <app-run-button (click)="runCode()"></app-run-button>
    </div>
    <ngx-monaco-editor [options]="editorOptions" [(ngModel)]="code" (onInit)="onEditorInit()"></ngx-monaco-editor>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background-color: var(--code-editor-bg);
        border-radius: 0.5rem;
      }

      .header {
        background-color: var(--primary);
        color: var(--color-primary);
        padding: 6px 10px;
        border-radius: 0.5rem 0.5rem 0 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.7px solid #e4f0ff63;
        height: 25px;
      }

      ngx-monaco-editor {
        flex-grow: 1;
      }
    `,
  ],
})
export class MainCodeComponent {
  languagesList: Language[] = LanguagesList;
  selectedLanguage: Language = this.languagesList[0];

  editorOptions = {
    theme: 'vs-dark',
    language: this.selectedLanguage.key,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: {
      top: 10,
    },
  };

  _code!: string;

  constructor(private readonly codeService: CodeService) {
    this.code = this.selectedLanguage.code;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  onEditorInit() {
    (<any>window).monaco.editor.defineTheme('default', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#001528',
        'editor.lineHighlightBorder': '#1f2937',
      },
    });
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
