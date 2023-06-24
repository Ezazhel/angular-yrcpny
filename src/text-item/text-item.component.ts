import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'text-item',
  standalone: true,
  template: `<span> {{text}} </span>`,
})
export class TextItemComponent {
  @Input()
  public text: string = '';
}
