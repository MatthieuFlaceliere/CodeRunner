import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Difficulty } from '../models/problem';

@Directive({
  selector: '[appDifficultyColor]',
})
export class DifficultyColorDirective implements OnInit {
  @Input('appDifficultyColor') difficulty!: string;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.color = this.getColor();
  }

  private getColor(): string {
    switch (this.difficulty) {
      case Difficulty.Easy:
        return 'green';
      case Difficulty.Medium:
        return 'orange';
      case Difficulty.Hard:
        return 'red';
      default:
        return 'black';
    }
  }
}
