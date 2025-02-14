import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'loading-button',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './loading-button.component.html',
  styleUrl: './loading-button.component.scss'
})
export class LoadingButtonComponent {

  @Input() buttonText!: string;
  @Input() isLoading: boolean = false;
  @Input() buttonType: string = 'submit';
  @Input() disabled: boolean = false;
  
}
