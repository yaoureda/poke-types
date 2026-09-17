import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokemonApi } from '../models/pokemon-api';
import { Pokemon } from '../models/pokemon';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApi {
  private readonly http = inject(HttpClient);

  getPokemon(id: number) : Observable<Pokemon> {
    return this.http.get<PokemonApi>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    ).pipe(
      map(this.toPokemonResponse)
    )
  }

  private toPokemonResponse(apiPokemon: PokemonApi) : Pokemon {
    return ({
      id: apiPokemon.id,
      name: apiPokemon.name,
      sprite: apiPokemon.sprites.other["official-artwork"].front_default,
      types: apiPokemon.types.map(type => type.type.name)
    })
  }
}
