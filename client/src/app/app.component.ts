import { Component, ViewEncapsulation } from '@angular/core';
import { CodeService } from './service/code.service';
import { LanguagesList } from './models/languages';
import { CodeResult } from './models/code';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  loading = false;

  languagesList = LanguagesList;
  selectedLanguage = this.languagesList[0];
  editorOptions = {
    theme: 'vs-dark',
    language: this.selectedLanguage.key,
    scrollBeyondLastLine: false,
    automaticLayout: true,
  };

  _code!: string;

  output = '';

  constructor(private readonly codeService: CodeService) {
    this.code = this.languagesList.find((lang) => lang.key === this.selectedLanguage.key)?.code || '';
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  runCode() {
    if (this.loading) return;
    this.loading = true;
    this.codeService.runCode({ src: this.code, lang: this.selectedLanguage.key }).subscribe((res) => {
      this.getCodeResult(res.data);
    });
  }

  getCodeResult(url: string) {
    this.codeService.getCodeResult(url).subscribe((res) => {
      if (res.data === null) {
        setTimeout(() => this.getCodeResult(url), 1000);
      } else {
        const codeOutput: CodeResult = JSON.parse(res.data);
        this.output = codeOutput.stdout;
        this.output += codeOutput.stderr;
        this.loading = false;
      }
    });
  }
}
