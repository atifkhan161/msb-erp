import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  success(text: string) {
    this.show(text, { classname: 'bg-success text-light' });
  }

  danger(text: string) {
    this.show(text, { classname: 'bg-danger text-light' });
  }

  warn(text: string) {
    this.show(text, { classname: 'bg-warn text-light' });
  }

  info(text: string) {
    this.show(text, { classname: 'bg-info text-light' });
  }
}
