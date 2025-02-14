import { Component } from '@angular/core';
import { InternationalizationService } from '../../services/internationalization.service';
import { MatIconModule } from '@angular/material/icon';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'language-dropdown',
  imports: [CommonModule, MatIconModule, NgbDropdownModule],
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.scss'
})
export class LanguageDropdownComponent {

    constructor(
      public internationalizationService: InternationalizationService
    ) { }

}
