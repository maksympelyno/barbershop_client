import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ClientsService } from '../../services/client.service';
import { ClientItemComponent } from './client-item/client-item.component';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, ClientItemComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  private clientsService = inject(ClientsService);

  ngOnInit() {
    this.clientsService.getClients();
  }

  get clients() {
    return this.clientsService.clients();
  }
}
