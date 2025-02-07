import { Component, Input } from '@angular/core';
import { VisitItemComponent } from '../visit-item/visit-item.component';
import { CommonModule } from '@angular/common';
import { VisitInfo } from '../../../models/visit.model';

@Component({
  selector: 'app-visit-list',
  imports: [CommonModule, VisitItemComponent],
  templateUrl: './visit-list.component.html',
  styleUrl: './visit-list.component.css',
})
export class VisitListComponent {
  @Input() visits: VisitInfo[] = [];
}
