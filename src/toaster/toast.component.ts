import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';

import { Toast } from './toast';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'd-toast',
  template: `
      <li class="ng-toast__message {{ toast.additionalClasses }} fade"
          [class.show]="visible"
          (mouseenter)="onMouseEnter()"
          (mouseleave)="onMouseLeave()"
          (click)="onToastClick()">
          <div class="alert alert-{{ toast.className }}"
               [class.alert-dismissible]="toast.dismissButton">
              <button type="button" class="close"
                      *ngIf="toast.dismissButton"
                      [innerHTML]="toast.dismissButtonHtml"
                      (click)="onDismissClick($event)"></button>
              <span *ngIf="toast.count" class="message-count">{{ toast.count + 1 }}</span>
              <span [innerHTML]="toast.content"></span>
          </div>
      </li>
  `,
  styles: [ `
      :host(.ng-toast--bottom.ng-toast--center) .ng-toast__message .alert {
          pointer-events: auto;
      }

      :host(.ng-toast--right) .ng-toast__message {
          text-align: right;
      }

      :host(.ng-toast--left) .ng-toast__message {
          text-align: left;
      }

      .ng-toast__message {
          display: block;
          width: 100%;
          text-align: center;
          margin-bottom: 1rem;
          pointer-events: auto;
      }

      .ng-toast__message .alert {
          display: inline-block;
          margin-bottom: 0;
          text-align: left;
      }

      .message-count {
          display: inline-block;
          margin: 0 0.125rem 0 0.375rem;
      }
  ` ],
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input()
  public toast: Toast;

  public visible = false;

  private dismissTimeout: any;

  public constructor(private service: ToasterService, private zone: NgZone) {
  }

  public ngOnInit() {
    setTimeout(() => this.visible = true, 0);
    this.startTimeout();
  }

  public ngOnDestroy() {
    if (this.toast.onDismiss) {
      this.toast.onDismiss(this.toast);
    }
  }

  public startTimeout() {
    if (this.toast.dismissOnTimeout) {
      this.zone.runOutsideAngular(() => {
        // Schedule timeout outside of Angular Zone to avoid E2E tests waiting for toast to disappear.
        this.dismissTimeout = setTimeout(() => this.zone.run(() => this.dismiss()), this.toast.timeout);
      });
    }
  }

  public cancelTimeout() {
    clearTimeout(this.dismissTimeout);
  }

  public dismiss() {
    this.visible = false;
    // Schedule timeout outside of Angular Zone to avoid E2E tests waiting for toast to disappear.
    this.zone.runOutsideAngular(() => setTimeout(() => this.zone.run(() => this.service.dismiss(this.toast.id)), 300));
  }

  public onMouseEnter() {
    this.cancelTimeout();
  }

  public onMouseLeave() {
    this.startTimeout();
  }

  public onToastClick() {
    if (this.toast.dismissOnClick) {
      this.dismiss();
    }
  }

  public onDismissClick(event: MouseEvent) {
    event.stopPropagation();

    this.dismiss();
  }
}
