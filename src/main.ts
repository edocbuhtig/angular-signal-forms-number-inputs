import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormComponent } from './form/form.component';
import { NG_STATUS_CLASSES } from '@angular/forms/signals/compat';
import { provideSignalFormsConfig } from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  template: '<app-form />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ FormComponent ]
})
export class App {
}

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideSignalFormsConfig({
      classes: NG_STATUS_CLASSES
    })
  ],
});
