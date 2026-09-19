import { Component, inject, signal } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokeApi } from '../services/poke-api';
import { TypeSelector } from '../components/type-selector/type-selector';
import { GameResult } from '../components/game-result/game-result';
import type { GameStatus } from '../models/game-status';
import { Header } from '../components/header/header';

@Component({
  imports: [Header, TypeSelector, GameResult],
  selector: 'app-game',
  styleUrl: './game.scss',
  templateUrl: './game.html',
})
export class Game {
  private readonly pokeApi = inject(PokeApi);

  ngOnInit() {
    this.loadPokemon();
  }

  protected readonly score = signal(0);
  protected readonly streak = signal(0);

  protected readonly currentPokemon = signal<Pokemon | null>(null);
  protected readonly selectedTypes = signal<string[]>([]);

  gameStatus = signal<GameStatus>('playing');

  loadPokemon() {
    const id = Math.floor(Math.random() * 1025) + 1;
    this.pokeApi.getPokemon(id).subscribe(pokemon => {
      this.currentPokemon.set(pokemon);
    });
  }

  selectType(type: string) {
    if (this.selectedTypes().includes(type)) {
      this.selectedTypes.set(
        this.selectedTypes().filter(selectedType => selectedType !== type)
      )
    } else if (this.selectedTypes().length < 2) {
      this.selectedTypes.set([...this.selectedTypes(), type])
    }
  }

  submitAnswer() {
    const pokemon = this.currentPokemon();
    if (pokemon === null) {
      return;
    }
    if (this.selectedTypes().length !== pokemon.types.length) {
      this.resetStreak();
      this.gameStatus.set('wrong');
      return;
    }
    const isCorrect : boolean = this.selectedTypes().every(type => pokemon.types.includes(type));
    if (isCorrect) {
      this.increase();
      this.gameStatus.set('correct');
    } else {
      this.resetStreak();
      this.gameStatus.set('wrong');
    }
  }

  increase() {
    this.score.update(s => s + 1);
    this.streak.update(s => s + 1);
  }

  resetStreak() {
    this.streak.set(0);
  }

  newRound() {
    this.selectedTypes.set([]);
    this.currentPokemon.set(null);
    this.gameStatus.set('playing');
    this.loadPokemon();
  }
}
