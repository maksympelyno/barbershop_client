import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { HaircutsService } from '../../services/haircut.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-haircut-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-haircut-modal.component.html',
  styleUrl: './add-haircut-modal.component.css',
})
export class AddHaircutModalComponent {
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private haircutsService = inject(HaircutsService);

  haircutForm: FormGroup;
  errorMessage = signal<string | null>(null);

  constructor() {
    this.haircutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['male', [Validators.required]],
      price: [0, [Validators.required, Validators.min(1)]],
    });
  }

  get name() {
    return this.haircutForm.get('name');
  }

  get gender() {
    return this.haircutForm.get('gender');
  }

  get price() {
    return this.haircutForm.get('price');
  }

  addHaircut() {
    if (this.haircutForm.valid) {
      this.haircutsService.addHaircut(this.haircutForm.value);
      this.close.emit();
    } else {
      this.errorMessage.set('Please fill out all fields correctly.');
    }
  }

  closeOnBlur(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }
}
