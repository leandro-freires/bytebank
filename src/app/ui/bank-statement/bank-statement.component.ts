import { Component } from '@angular/core';

import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-bank-statement',
  imports: [
    CardComponent,
    ButtonComponent
  ],
  templateUrl: './bank-statement.component.html',
  styleUrl: './bank-statement.component.scss'
})
export class BankStatementComponent {

}
