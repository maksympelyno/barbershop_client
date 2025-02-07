import { Component, inject, signal } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  loginForm: FormGroup;
  errorMessage = signal<string | null>(null);
  showLoginForm = true;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (user) => {
          console.log('Login successful', user);
          this.errorMessage.set(null); // Очищаємо повідомлення про помилку
        },
        error: (err) => {
          console.error('Login failed', err);
          this.errorMessage.set('Invalid email or password. Please try again.'); // Встановлюємо помилку
        },
      });
    }
  }
}
