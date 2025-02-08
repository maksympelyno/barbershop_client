import { Component, inject } from '@angular/core';
import { HaircutsService } from '../../services/haircut.service';
import { CommonModule } from '@angular/common';
import { HaircutItemComponent } from './haircut-item/haircut-item.component';
import { AddHaircutModalComponent } from '../../modals/add-haircut-modal/add-haircut-modal.component';

@Component({
  selector: 'app-haircuts',
  imports: [CommonModule, HaircutItemComponent, AddHaircutModalComponent],
  templateUrl: './haircuts.component.html',
  styleUrl: './haircuts.component.css',
})
export class HaircutsComponent {
  private haircutsService = inject(HaircutsService);
  isModalOpen = false;

  ngOnInit() {
    this.haircutsService.getHaircuts();
  }

  get haircuts() {
    return this.haircutsService.haircuts();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
