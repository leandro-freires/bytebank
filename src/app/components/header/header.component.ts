import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  navigationService: NavigationService = inject(NavigationService);

  isOpen = computed(() => this.navigationService.open());

  onClick(): void {
    this.navigationService.onToggle();
  }
}
