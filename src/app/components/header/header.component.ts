import { Component, inject, ViewEncapsulation } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  imports: [
    ButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  navigationService: NavigationService = inject(NavigationService);

  onClick(): void {
    this.navigationService.onToggle();
  }
}
