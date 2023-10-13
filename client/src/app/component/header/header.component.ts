import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: ` <nav>
    <div class="left-container container">
      <a routerLink="/">
        <div class="logo">
          <img src="assets/logo.png" alt="" />
        </div>
        <span>Code Runner</span>
      </a>
    </div>
    <div class="container">
      <a routerLink="/problem" class="item"> Problems </a>
      <a routerLink="/sandbox" class="item"> Sandbox </a>
    </div>
  </nav>`,
  styles: [
    `
      nav {
        background-color: var(--primary);
        color: var(--color-primary);
        display: flex;

        .container {
          align-items: center;
          margin: 1rem 0;
          padding: 0 1rem;
          display: flex;
          flex-direction: row;
        }

        .left-container {
          border-right: 1px solid var(--color-primary);
        }

        .item {
          margin: 0 1rem;
          text-decoration: none;
          color: var(--color-primary);
        }

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
    `,
  ],
})
export class HeaderComponent {}
