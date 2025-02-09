import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-haircut-price-history',
  imports: [CommonModule],
  templateUrl: './haircut-price-history.component.html',
  styleUrl: './haircut-price-history.component.css',
})
export class HaircutPriceHistoryComponent {
  @Input() priceHistory: any[] = [];
}
