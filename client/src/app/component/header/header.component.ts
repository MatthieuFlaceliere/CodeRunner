import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: ` <nav>
    <div class="left-container">
      <a routerLink="/">
        <div class="logo">
          <img src="assets/logo.png" alt="" />
        </div>
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
          align-items: center;
          padding: 1rem;
          display: flex;
          flex-direction: row;
          a {
            display: flex;
            align-items: center;
            span {
              align-self: center;
              font-size: 1.5rem;
              font-weight: 600;
            }
            .logo {
              width: 2rem;
              height: 2rem;
              margin-right: 0.7rem;
              background-color: #c8c8c8;
              border-radius: 0.5rem;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
        }
      }
    `,
  ],
})
export class HeaderComponent {}
