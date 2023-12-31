import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { HeaderComponent } from './component/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MainCodeComponent } from './component/main-code/main-code.component';
import { RunButtonComponent } from './component/run-button/run-button.component';
import { SelectLanguageComponent } from './component/select-language/select-language.component';
import { OutputComponent } from './component/output/output.component';
import { ProblemDescriptionComponent } from './component/problem-description/problem-description.component';
import { ProblemComponent } from './pages/problem/problem.component';
import { SandboxComponent } from './pages/sandbox/sandbox.component';
import { ProblemSelectionComponent } from './pages/problem-selection/problem-selection.component';
import { ProblemRowComponent } from './component/problem-row/problem-row.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DifficultyColorDirective } from './directives/difficulty-color.directive';
import { TestCaseComponent } from './component/test-case/test-case.component';
import { MainCodeForProblemComponent } from './component/main-code-for-problem/main-code-for-problem.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainCodeComponent,
    RunButtonComponent,
    SelectLanguageComponent,
    OutputComponent,
    ProblemDescriptionComponent,
    ProblemComponent,
    SandboxComponent,
    ProblemSelectionComponent,
    ProblemRowComponent,
    DifficultyColorDirective,
    TestCaseComponent,
    MainCodeForProblemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
