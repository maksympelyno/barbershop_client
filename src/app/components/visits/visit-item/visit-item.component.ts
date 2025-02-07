import { Component, Input } from '@angular/core';
import { VisitInfo } from '../../../models/visit.model';
import { CommonModule } from '@angular/common';
import { formatDateString } from '../../../utils/date-utils';

@Component({
  selector: 'app-visit-item',
  imports: [CommonModule],
  templateUrl: './visit-item.component.html',
  styleUrl: './visit-item.component.css',
})
export class VisitItemComponent {
  @Input() visit!: VisitInfo;

  get formattedDate(): string {
    return formatDateString(this.visit.date);
  }
}
