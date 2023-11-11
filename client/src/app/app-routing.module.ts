import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SandboxComponent } from './pages/sandbox/sandbox.component';
import { AppComponent } from './app.component';
import { ProblemComponent } from './pages/problem/problem.component';
import { ProblemSelectionComponent } from './pages/problem-selection/problem-selection.component';

const routes: Routes = [
  { path: 'sandbox', component: SandboxComponent },
  { path: 'problem', component: ProblemSelectionComponent },
  { path: 'problem/:problem-id', component: ProblemComponent },
  { path: '', redirectTo: 'sandbox', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
