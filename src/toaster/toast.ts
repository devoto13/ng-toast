let toastDefaults: ToastOptions = {
  content: '',
  className: 'success',
  dismissOnTimeout: true,
  timeout: 4000,
  dismissButton: false,
  dismissButtonHtml: '&times;',
  dismissOnClick: true,
  onDismiss: () => null,
  additionalClasses: undefined,
};

export class Toast {
  private static ID = 1;

  public id: number;
  public count: number;

  public content: string;
  public className: 'success' | 'danger' | 'warning' | 'info';
  public dismissOnTimeout: boolean;
  public timeout: number;
  public dismissButton: boolean;
  public dismissButtonHtml: string;
  public dismissOnClick: boolean;
  public onDismiss: (message: Toast) => void;
  public additionalClasses: string;

  public constructor(options: ToastOptions) {
    this.id = Toast.ID++;
    this.count = 0;

    Object.assign(this, toastDefaults, options);
  }
}

export interface ToastOptions {
  content?: string;
  className?: 'success' | 'danger' | 'warning' | 'info';
  dismissOnTimeout?: boolean;
  timeout?: number;
  dismissButton?: boolean;
  dismissButtonHtml?: string;
  dismissOnClick?: boolean;
  onDismiss?: (message: Toast) => void;
  additionalClasses?: string;
}
