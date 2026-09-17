import { Component, input, output } from '@angular/core';
import { TYPES } from '../../data/types';
import { Type } from '../../models/type';

@Component({
  imports: [],
  selector: 'app-type-selector',
  styleUrl: './type-selector.scss',
  templateUrl: './type-selector.html',
})
export class TypeSelector {
  protected readonly types : Type[] = TYPES;

  typeSelected = output<string>();
  typesSelected = input.required<string[]>();
}
