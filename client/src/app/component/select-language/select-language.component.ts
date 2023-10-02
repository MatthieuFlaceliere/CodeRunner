import { Component } from '@angular/core';
import { LanguagesList } from 'src/app/models/languages';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
})
export class SelectLanguageComponent {
  languagesList = LanguagesList;
  selectedLanguage = this.languagesList[0];

  onLanguageChange() {
    // this.editorOptions = {
    //   ...this.editorOptions,
    //   language: this.selectedLanguage.key,
    // };
    // this.code = this.languagesList.find((lang) => lang.key === this.selectedLanguage.key)?.code || '';
  }
}
