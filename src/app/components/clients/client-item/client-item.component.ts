import { Component, Input } from '@angular/core';
import { Client } from '../../../models/client.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-item',
  imports: [CommonModule],
  templateUrl: './client-item.component.html',
  styleUrl: './client-item.component.css',
})
export class ClientItemComponent {
  @Input() client!: Client;
}
