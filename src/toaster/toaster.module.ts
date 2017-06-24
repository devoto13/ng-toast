import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToastContainerComponent } from './toast-container.component';
import { ToastComponent } from './toast.component';
import { ToasterService } from './toaster.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ToastContainerComponent,
    ToastComponent,
  ],
  exports: [
    ToastContainerComponent,
  ],
  providers: [
    ToasterService,
  ],
})
export class ToasterModule {
}
