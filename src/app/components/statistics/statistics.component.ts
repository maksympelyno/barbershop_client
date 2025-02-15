import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchService } from '../../services/branch.service';
import { StatisticsBranchComponent } from './statistics-branch/statistics-branch.component';
import { HaircutPriceHistoryComponent } from '../haircut-price-history/haircut-price-history.component';
import { HaircutsService } from '../../services/haircut.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Haircut, HaircutPriceHistory } from '../../models/haircut.model';
import { Branch } from '../../models/branch.model';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    StatisticsBranchComponent,
    HaircutPriceHistoryComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent {
  private branchService = inject(BranchService);
  private haircutService = inject(HaircutsService);
  private fb = inject(FormBuilder);

  selectedBranchId = signal<string>('');
  selectedHaircutId = signal<string>('');
  haircutsForSelect = signal<Haircut[]>([]);
  branches = signal<Branch[]>([]);
  priceHistoryData = signal<HaircutPriceHistory[]>([]);
  form: FormGroup = this.fb.group({ haircutSearch: [''], haircutId: [''] });
  selectedTab = signal<'branches' | 'haircuts'>('branches');

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    this.branchService.getBranches().subscribe((branches) => {
      this.branches.set(branches);
    });
  }

  searchHaircuts() {
    const name = this.form.value.haircutSearch;
    if (!name) return;

    this.haircutService.searchHaircutsByName(name).subscribe((haircuts) => {
      this.haircutsForSelect.set(haircuts);
    });
  }

  onHaircutSelect() {
    const haircutId = this.form.value.haircutId;
    this.selectedHaircutId.set(haircutId);
    this.loadPriceHistory(haircutId);
  }

  loadPriceHistory(haircutId: string) {
    if (!haircutId) return;
    this.haircutService
      .getHaicutsPriceHistory(haircutId)
      .subscribe((history) => {
        this.priceHistoryData.set(history);
      });
  }

  onBranchChange(event: Event) {
    this.selectedBranchId.set((event.target as HTMLSelectElement).value);
  }

  setTab(tab: 'branches' | 'haircuts') {
    this.selectedTab.set(tab);
  }
}
