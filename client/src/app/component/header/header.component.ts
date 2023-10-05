import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: ` <nav>
    <div class="left-container">
      <a routerLink="/">
        <span>Code Runner</span>
      </a>
    </div>
  </nav>`,
  styles: [
    `
      nav {
        background-color: var(--primary);
        color: var(--color-primary);
        display: flex;

        .left-container {
          align-items: start;
          padding: 1rem;
          a {
            display: flex;
            align-items: center;
            span {
              align-self: center;
              font-size: 1.5rem;
              font-weight: 600;
            }
          }
        }
      }
    `,
  ],
})
export class HeaderComponent {}
