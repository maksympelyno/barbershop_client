import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { ClientsService } from '../../services/client.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-client-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-client-modal.component.html',
  styleUrl: './add-client-modal.component.css',
})
export class AddClientModalComponent {
  @Output() close = new EventEmitter<void>();

  private clientsService = inject(ClientsService);
  private fb = inject(FormBuilder);

  errorMessage = signal<string | null>(null);

  clientForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    middleName: [''],
    phoneNumber: ['', [Validators.required]],
    gender: ['', [Validators.required]],
  });

  get firstName() {
    return this.clientForm.get('firstName');
  }

  get lastName() {
    return this.clientForm.get('lastName');
  }

  get middleName() {
    return this.clientForm.get('middleName');
  }

  get phoneNumber() {
    return this.clientForm.get('phoneNumber');
  }

  get gender() {
    return this.clientForm.get('gender');
  }

  addClient() {
    if (this.clientForm.valid) {
      this.clientsService.addClient(this.clientForm.value).subscribe({
        next: () => {
          this.errorMessage.set(null);
          this.close.emit();
        },
        error: (err) =>
          this.errorMessage.set(err.error?.message || 'Failed to add client'),
      });
    }
  }

  closeOnBlur(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }
}
