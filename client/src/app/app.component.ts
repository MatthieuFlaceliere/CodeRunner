import { Component, ViewEncapsulation } from '@angular/core';
import { CodeService } from './service/code.service';
import { LanguagesList } from './models/languages';

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
    this.loading = true;
    this.codeService.runCode({ src: this.code, lang: this.selectedLanguage.key }).subscribe((res) => {
      this.getCodeResult(res.data);
    });
  }

  getCodeResult(url: string) {
    this.codeService.getCodeResult(url).subscribe((res) => {
      if (res.data === null) {
        this.getCodeResult(url);
      } else {
        this.output = JSON.stringify(res.data, null, 2);
        this.loading = false;
      }
    });
  }

  onLanguageChange() {
    this.editorOptions = {
      ...this.editorOptions,
      language: this.selectedLanguage.key,
    };
    this.code = this.languagesList.find((lang) => lang.key === this.selectedLanguage.key)?.code || '';
  }
}
