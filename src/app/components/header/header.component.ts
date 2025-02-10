import { Component, computed, inject, Signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);

  userName: Signal<string> = computed(() => this.authService.getUserName());
  isAuthenticated: Signal<boolean> = computed(() =>
    this.authService.isAuthenticated()
  );

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}
