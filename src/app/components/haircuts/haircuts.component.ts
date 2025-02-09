import { Component, computed, inject, signal } from '@angular/core';
import { HaircutsService } from '../../services/haircut.service';
import { CommonModule } from '@angular/common';
import { HaircutItemComponent } from './haircut-item/haircut-item.component';
import { AddHaircutModalComponent } from '../../modals/add-haircut-modal/add-haircut-modal.component';
import { HAIRCUTS_PER_PAGE } from '../../constants/haircut.constants';

@Component({
  selector: 'app-haircuts',
  imports: [CommonModule, HaircutItemComponent, AddHaircutModalComponent],
  templateUrl: './haircuts.component.html',
  styleUrl: './haircuts.component.css',
})
export class HaircutsComponent {
  private haircutsService = inject(HaircutsService);
  isModalOpen = false;

  page = signal<number>(1);
  totalPages = computed(() => {
    return Math.ceil(this.haircuts.length / HAIRCUTS_PER_PAGE);
  });

  ngOnInit() {
    this.haircutsService.getHaircuts();
  }

  get haircuts() {
    return this.haircutsService.haircuts();
  }

  get paginatedHaircuts() {
    const startIndex = (this.page() - 1) * HAIRCUTS_PER_PAGE;
    const endIndex = startIndex + HAIRCUTS_PER_PAGE;
    return this.haircuts.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.page() < this.totalPages()) {
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
