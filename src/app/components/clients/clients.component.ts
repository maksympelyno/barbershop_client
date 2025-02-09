import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ClientsService } from '../../services/client.service';
import { ClientItemComponent } from './client-item/client-item.component';
import { AddClientModalComponent } from '../../modals/add-client-modal/add-client-modal.component';
import { CLIENTS_PER_PAGE } from '../../constants/client.constant';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, ClientItemComponent, AddClientModalComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  private clientsService = inject(ClientsService);
  isModalOpen = false;

  page = signal<number>(1);
  totalPages = computed(() => {
    return Math.ceil(this.clients.length / CLIENTS_PER_PAGE);
  });

  ngOnInit() {
    this.clientsService.getClients();
  }

  get clients() {
    return this.clientsService.clients();
  }

  get paginatedClients() {
    const startIndex = (this.page() - 1) * CLIENTS_PER_PAGE;
    const endIndex = startIndex + CLIENTS_PER_PAGE;
    return this.clients.slice(startIndex, endIndex);
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
