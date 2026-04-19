import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { form, FormField, required, max, min } from '@angular/forms/signals';

interface SignupFormData {
  username: string;
  email: string;
  age: number | null;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, JsonPipe],
})
export class FormComponent {
  protected model = signal<SignupFormData>({
    username: '',
    email: '',
    age: null,
  });

  protected signupForm = form(this.model, s => {
    required(s.username, { message: 'Username is required' });
    required(s.email, { message: 'Email is required' });

    required(s.age, { message: 'Age is required' });

    // 1.
    min(s.age, 18, { message: 'You must be at least 18' });
    max(s.age, 120, { message: 'Please enter a valid age' });
  });

  // 2.
  protected onAgeKeydown(event: KeyboardEvent) {
    // These keys are allowed for this input
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight',
    ];
// Else
    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();// do nothing
    }
  }
}
