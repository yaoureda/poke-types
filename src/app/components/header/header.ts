import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  score = input.required<number>();
  streak = input.required<number>();
}
