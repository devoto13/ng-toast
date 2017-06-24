import { Component } from '@angular/core';

import { Toast } from './toast';
import { GlobalOptions, ToasterService } from './toaster.service';

@Component({
  selector: 'd-toast-container',
  template: `
      <div [class]="containerClass">
          <ul class="ng-toast__list">
              <d-toast *ngFor="let toast of toasts" [toast]="toast" [class]="itemClass"></d-toast>
          </ul>
      </div>
  `,
  styles: [ `
      .ng-toast {
          position: fixed;
          z-index: 1080;
          width: 100%;
          height: 0;
          margin-top: 1.5rem;
          text-align: center;
      }

      .ng-toast.ng-toast--top {
          top: 0;
          bottom: auto;
      }

      .ng-toast.ng-toast--top .ng-toast__list {
          top: 0;
          bottom: auto;
      }

      .ng-toast.ng-toast--top.ng-toast--center .ng-toast__list {
          position: static;
      }

      .ng-toast.ng-toast--bottom {
          top: auto;
          bottom: 0;
      }

      .ng-toast.ng-toast--bottom .ng-toast__list {
          top: auto;
          bottom: 0;
      }

      .ng-toast.ng-toast--right .ng-toast__list {
          left: auto;
          right: 0;
          margin-right: 1.5rem;
      }

      .ng-toast.ng-toast--left .ng-toast__list {
          right: auto;
          left: 0;
          margin-left: 1.5rem;
      }

      .ng-toast .ng-toast__list {
          pointer-events: none;
          display: inline-block;
          position: absolute;
          right: 0;
          left: 0;
          margin: 0 auto;
          padding: 0;
          list-style: none;
          width: 30%;
      }
  ` ],
})
export class ToastContainerComponent {
  public get containerClass(): string {
    return `ng-toast ng-toast--${this.options.horizontalPosition} ng-toast--${this.options.verticalPosition}`;
  }

  public get itemClass(): string {
    return `ng-toast--${this.options.horizontalPosition} ng-toast--${this.options.verticalPosition}`;
  }

  public get options(): GlobalOptions {
    return this.service.options;
  }

  public get toasts(): Toast[] {
    return this.service.toasts;
  }

  public constructor(private service: ToasterService) {
  }
}
