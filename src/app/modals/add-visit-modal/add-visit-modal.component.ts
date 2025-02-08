import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VisitsService } from '../../services/visit.service';
import { ClientsService } from '../../services/client.service';
import { HaircutsService } from '../../services/haircut.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-visit-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-visit-modal.component.html',
  styleUrl: './add-visit-modal.component.css',
})
export class AddVisitModalComponent {
  private visitsService = inject(VisitsService);
  private clientsService = inject(ClientsService);
  private haircutsService = inject(HaircutsService);
  private fb = inject(FormBuilder);

  @Output() close = new EventEmitter<void>();

  visitForm: FormGroup = this.fb.group({
    clientSearch: [''],
    clientId: ['', Validators.required],
    haircutSearch: [''],
    haircutId: ['', Validators.required],
    date: ['', Validators.required],
  });

  clientsForSelect = signal<any[]>([]);
  haircutsForSelect = signal<any[]>([]);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.loadClients();
    this.loadHaircuts();
  }

  loadClients() {
    this.clientsService.getClientsObs().subscribe({
      next: (haircuts) => this.clientsForSelect.set(haircuts),
      error: () => this.errorMessage.set('Error fetching haircuts'),
    });
  }

  loadHaircuts() {
    this.haircutsService.getHaircutsByBranch().subscribe({
      next: (haircuts) => this.haircutsForSelect.set(haircuts),
      error: () => this.errorMessage.set('Error fetching haircuts'),
    });
  }

  searchClients() {
    const phone = this.visitForm.get('clientSearch')?.value;
    if (!phone) {
      this.loadClients();
      return;
    }
    this.clientsService.searchClients(phone).subscribe({
      next: (clients) => this.clientsForSelect.set(clients),
      error: () => this.errorMessage.set('Error fetching clients'),
    });
  }

  searchHaircuts() {
    const name = this.visitForm.get('haircutSearch')?.value;
    if (!name) {
      this.loadHaircuts();
      return;
    }
    this.haircutsService.searchHaircuts(name).subscribe({
      next: (haircuts) => this.haircutsForSelect.set(haircuts),
      error: () => this.errorMessage.set('Error fetching haircuts'),
    });
  }

  addVisit() {
    if (this.visitForm.valid) {
      this.visitsService.addVisit(this.visitForm.value).subscribe({
        next: () => this.close.emit(),
        error: () => this.errorMessage.set('Error adding visit'),
      });
    }
  }

  closeOnBlur(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }
}
