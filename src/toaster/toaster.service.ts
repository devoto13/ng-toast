import { Injectable } from '@angular/core';

import { Toast, ToastOptions } from './toast';

let globalDefaults: GlobalOptions = {
  combineDuplications: false,
  horizontalPosition: 'right',
  verticalPosition: 'top',
  maxNumber: 0,
  newestOnTop: false,
};

@Injectable()
export class ToasterService {
  public options: GlobalOptions;
  public toasts: Toast[] = [];
  public toastStack: number[] = [];

  public constructor() {
    this.options = Object.assign({}, globalDefaults);
  }

  public dismiss(id: number) {
    if (id) {
      for (let i = this.toasts.length - 1; i >= 0; i--) {
        if (this.toasts[ i ].id === id) {
          this.toasts.splice(i, 1);
          this.toastStack.splice(this.toastStack.indexOf(id), 1);
          return;
        }
      }
    } else {
      while (this.toasts.length > 0) {
        this.toasts.pop();
      }
      this.toastStack = [];
    }
  }

  public create(toast: ToastOptions): number {
    if (this.options.combineDuplications) {
      for (let i = this.toastStack.length - 1; i >= 0; i--) {
        let _toast = this.toasts[ i ];
        let _className = toast.className || 'success';

        if (_toast.content === toast.content &&
          _toast.className === _className) {
          this.toasts[ i ].count++;
          return this.toasts[ i ].id;
        }
      }
    }

    if (this.options.maxNumber > 0 &&
      this.toastStack.length >= this.options.maxNumber) {
      this.dismiss(this.toastStack[ 0 ]);
    }

    let newToast = new Toast(toast);
    if (this.options.newestOnTop) {
      this.toasts.unshift(newToast);
    } else {
      this.toasts.push(newToast);
    }
    this.toastStack.push(newToast.id);

    return newToast.id;
  }

  public success(toast: ToastOptions | string): number {
    return this.createWithClassName('success', toast);
  }

  public info(toast: ToastOptions | string): number {
    return this.createWithClassName('info', toast);
  }

  public warning(toast: ToastOptions | string): number {
    return this.createWithClassName('warning', toast);
  }

  public danger(toast: ToastOptions | string): number {
    return this.createWithClassName('danger', toast);
  }

  private createWithClassName(className: 'success' | 'danger' | 'warning' | 'info', toast: ToastOptions | string) {
    if (typeof toast === 'string') {
      toast = { content: toast };
    }
    toast.className = className;
    return this.create(toast);
  }
}

export interface GlobalOptions {
  combineDuplications?: boolean;
  horizontalPosition?: 'right' | 'left' | 'center';
  verticalPosition?: 'top' | 'bottom';
  maxNumber: number;
  newestOnTop?: boolean;
}
