import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { CardComponent } from '../../components/card/card.component';
import { BankStatementComponent } from '../../ui/bank-statement/bank-statement.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    HeaderComponent,
    SideMenuComponent,
    BankStatementComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {



}
