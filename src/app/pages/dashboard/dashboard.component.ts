import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { BankStatementComponent } from '../../ui/bank-statement/bank-statement.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    HeaderComponent,
    SideMenuComponent,
    BankStatementComponent,
    DatePipe,
    TitleCasePipe,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {

  today = signal<Date>(new Date());

  showBalanceValue = signal<boolean>(false);

  onShowBalanceValue(): void {
    this.showBalanceValue.update(value => !value);
  }

}
