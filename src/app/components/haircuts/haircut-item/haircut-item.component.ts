import { Component, Input } from '@angular/core';
import { Haircut } from '../../../models/haircut.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-haircut-item',
  imports: [CommonModule],
  templateUrl: './haircut-item.component.html',
  styleUrl: './haircut-item.component.css',
})
export class HaircutItemComponent {
  @Input() haircut!: Haircut;
}
