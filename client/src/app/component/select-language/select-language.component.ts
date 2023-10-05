import { Component, EventEmitter, Output } from '@angular/core';
import { Language, LanguagesList } from 'src/app/models/languages';

@Component({
  selector: 'app-select-language',
  template: `
    <select [(ngModel)]="selectedLanguage" (change)="onLanguageChange.emit(selectedLanguage)">
      <option *ngFor="let language of languagesList" [ngValue]="language">{{ language.key }}</option>
    </select>
  `,
  styles: [
    `
      select {
        display: flex;
        width: 100px;
        padding: 0;
        font-size: 0.875rem;
        line-height: 1.25rem;
        border-color: rgb(255, 255, 255, 0);
        background-color: rgb(255, 255, 255, 0);
        color: var(--color-primary);
        cursor: pointer;
      }
    `,
  ],
})
export class SelectLanguageComponent {
  languagesList = LanguagesList;
  selectedLanguage = this.languagesList[0];

  @Output() onLanguageChange: EventEmitter<Language> = new EventEmitter<Language>();
}
