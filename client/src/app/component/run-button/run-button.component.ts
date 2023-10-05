import { Component, Input } from '@angular/core';
import { CodeService } from 'src/app/service/code.service';

@Component({
  selector: 'app-run-button',
  template: `
    <button type="button">
      <img *ngIf="loading" src="assets/loading.svg" alt="loading" />
      <span *ngIf="!loading">Run</span>
    </button>
  `,
  styles: [
    `
      button {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        border-radius: 0.5rem;
        border: 0px;
        width: 5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 700;
        text-align: center;
        color: #ffffff;
        background-color: rgb(22 163 74);
        cursor: pointer;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      img {
        height: 100%;
      }
    `,
  ],
})
export class RunButtonComponent {
  loading!: boolean;

  constructor(private readonly codeService: CodeService) {
    this.codeService.loading$.subscribe((loading) => (this.loading = loading));
  }
}
