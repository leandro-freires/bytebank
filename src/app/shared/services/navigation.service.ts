import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  open = signal<boolean>(false);

  constructor() { }

  onToggle(): void {
    this.open.update(value => !value );
  }
}
