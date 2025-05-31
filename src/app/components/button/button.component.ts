import { Component, input, ViewEncapsulation } from '@angular/core';

type ButtonAppearance = 'outlined' | 'filled' | 'text';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonColor = 'primary' | 'secondary' | 'tertiary';

@Component({
  selector: 'button[appButton]',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.button]': '!iconButton()',
    '[class.icon-button]': 'iconButton()',
    '[class]': 'color() ? "button--" + color() : ""',
    '[class.button-outlined]': 'appearance() === "outlined"',
    '[class.button-filled]': 'appearance() === "filled"',
    '[class.button-text]': 'appearance() === "text"',
    '[class.button--small]': 'size() === "small"',
    '[class.button--medium]': 'size() === "medium"',
    '[class.button--large]': 'size() === "large"',
  }
})
export class ButtonComponent {
  color = input<ButtonColor>('primary');
  appearance = input<ButtonAppearance>('filled');
  size = input<ButtonSize>('medium');
  iconButton = input<boolean>(false);
}
