import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CodeService } from 'src/app/service/code.service';

@Component({
  selector: 'app-output',
  template: `
    <div class="card-header">Output</div>
    <pre #outputElement>{{ output }}</pre>
  `,
  styles: [
    `
      pre {
        padding: 7px;
        margin: 10px;
        color: var(--color-primary);
        font-family: 'Fira Code', monospace;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 400;
        text-align: left;
        white-space: pre-wrap;
        word-break: break-all;
        word-wrap: break-word;
        border-radius: 0.5rem;

        -webkit-user-select: text; /* Safari */
        -ms-user-select: text; /* IE 10 and IE 11 */
        user-select: text; /* Standard syntax */
      }
    `,
  ],
})
export class OutputComponent {
  output!: string;
  code!: number;

  @ViewChild('outputElement') outputElement!: ElementRef<HTMLPreElement>;

  constructor(private readonly codeService: CodeService) {
    this.codeService.output$.subscribe((output) => {
      this.code = output.code;
      if (this.code !== 0) {
        this.output = output.stderr;
        this.outputElement.nativeElement.style.backgroundColor = 'rgba(255, 30, 30, 0.26)';
      } else {
        this.output = output.stdout;
      }
    });
  }
}
