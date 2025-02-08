import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { VisitsService } from '../../services/visit.service';
import { VisitListComponent } from './visit-list/visit-list.component';
import { AddVisitModalComponent } from '../../modals/add-visit-modal/add-visit-modal.component';

@Component({
  selector: 'app-visits',
  imports: [CommonModule, VisitListComponent, AddVisitModalComponent],
  templateUrl: './visits.component.html',
  styleUrl: './visits.component.css',
})
export class VisitsComponent {
  private visitsService = inject(VisitsService);
  isModalOpen = false;

  page = signal<number>(1);
  itemsPerPage = 5;
  totalPages = computed(() => {
    return Math.ceil(this.visits.length / this.itemsPerPage);
  });

  ngOnInit() {
    this.visitsService.getVisits();
  }

  get visits() {
    return this.visitsService.visits();
  }

  get paginatedVisits() {
    const startIndex = (this.page() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.visits.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.page() < Math.ceil(this.visits.length / this.itemsPerPage)) {
      this.page.update((p) => p + 1);
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
