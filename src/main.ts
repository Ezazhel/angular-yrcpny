import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { DragRootComponent } from './drag-root.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, DragRootComponent],
  template: `<drag-root></drag-root>`,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
