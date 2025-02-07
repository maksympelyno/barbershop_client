import { Component, computed, inject, Input } from '@angular/core';
import { StatisticsService } from '../../../services/statistics.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics-branch',
  imports: [CommonModule],
  templateUrl: './statistics-branch.component.html',
  styleUrl: './statistics-branch.component.css',
})
export class StatisticsBranchComponent {
  private statisticsService = inject(StatisticsService);

  @Input() branchId!: string;

  revenue = computed(() => this.statisticsService.revenue());
  totalClients = computed(() => this.statisticsService.totalClients());
  totalVisits = computed(() => this.statisticsService.totalVisits());
  popularHaircut = computed(() => this.statisticsService.popularHaircut());
  averagePrice = computed(() => this.statisticsService.averagePrice());

  ngOnChanges() {
    if (this.branchId) {
      this.statisticsService.fetchStatistics(this.branchId);
    }
  }
}
