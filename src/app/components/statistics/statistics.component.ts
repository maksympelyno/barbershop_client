import { Component, computed, inject, signal } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import { CommonModule } from '@angular/common';
import { BranchService } from '../../services/branch.service';
import { StatisticsBranchComponent } from './statistics-branch/statistics-branch.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, StatisticsBranchComponent],
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent {
  private branchService = inject(BranchService);
  selectedBranchId = signal<string>('');

  branches = computed(() => this.branchService.branches());

  onBranchChange(event: Event) {
    this.selectedBranchId.set((event.target as HTMLSelectElement).value);
  }
}
