import { Component, inject, Input } from '@angular/core';
import { Haircut } from '../../../models/haircut.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HaircutsService } from '../../../services/haircut.service';

@Component({
  selector: 'app-haircut-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './haircut-item.component.html',
  styleUrl: './haircut-item.component.css',
})
export class HaircutItemComponent {
  @Input() haircut!: Haircut;

  private haircutsService = inject(HaircutsService);
  isEditing = false;
  editableHaircut: Haircut = { ...this.haircut };

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.editableHaircut = { ...this.haircut };
  }

  saveChanges() {
    if (this.editableHaircut.name.trim() && this.editableHaircut.price > 0) {
      this.haircutsService.updateHaircut(this.haircut._id, {
        name: this.editableHaircut.name,
        price: this.editableHaircut.price,
      });
      this.isEditing = false;
    }
  }
}
