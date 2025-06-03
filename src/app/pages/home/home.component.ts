import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-home',
  imports: [
    ButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private router = inject(Router);

  navigateToDashboard() {
    this.router.navigate(['/bytebank-admin']);
  }
}
