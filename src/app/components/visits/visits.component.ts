import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { VisitsService } from '../../services/visit.service';
import { VisitListComponent } from './visit-list/visit-list.component';

@Component({
  selector: 'app-visits',
  imports: [CommonModule, VisitListComponent],
  templateUrl: './visits.component.html',
  styleUrl: './visits.component.css',
})
export class VisitsComponent {
  private visitsService = inject(VisitsService);

  ngOnInit() {
    this.visitsService.getVisits();
  }

  get visits() {
    return this.visitsService.visits();
  }
}
