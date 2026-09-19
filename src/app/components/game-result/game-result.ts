import { Component, input, output } from '@angular/core';
import { Type } from '../../models/type';
import { TYPES } from '../../data/types';
import type { GameStatus } from '../../models/game-status';

// This component is only called when result input is 'correct' or 'wrong'
@Component({
  imports: [],
  selector: 'app-game-result',
  styleUrl: './game-result.scss',
  templateUrl: './game-result.html',
})
export class GameResult {
  protected readonly types : Type[] = TYPES;

  result = input.required<GameStatus>(); // result can only be 'correct' or 'wrong'
  correctTypes = input.required<string[]>();

  next = output<void>();

  getTypeColor(typeName: string) : string {
    return this.types.find(type => type.name === typeName)?.color ?? 'gray';
  }
}
