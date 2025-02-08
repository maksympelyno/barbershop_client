import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ClientsService } from '../../services/client.service';
import { ClientItemComponent } from './client-item/client-item.component';
import { AddClientModalComponent } from '../../modals/add-client-modal/add-client-modal.component';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, ClientItemComponent, AddClientModalComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  private clientsService = inject(ClientsService);
  isModalOpen = false;

  ngOnInit() {
    this.clientsService.getClients();
  }

  get clients() {
    return this.clientsService.clients();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
