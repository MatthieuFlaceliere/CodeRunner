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
export class AppComponent {}
