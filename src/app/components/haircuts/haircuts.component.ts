import { Component, inject } from '@angular/core';
import { HaircutsService } from '../../services/haircut.service';
import { CommonModule } from '@angular/common';
import { HaircutItemComponent } from './haircut-item/haircut-item.component';

@Component({
  selector: 'app-haircuts',
  imports: [CommonModule, HaircutItemComponent],
  templateUrl: './haircuts.component.html',
  styleUrl: './haircuts.component.css',
})
export class HaircutsComponent {
  private haircutsService = inject(HaircutsService);

  ngOnInit() {
    this.haircutsService.getHaircuts();
  }

  get haircuts() {
    return this.haircutsService.haircuts();
  }
}
