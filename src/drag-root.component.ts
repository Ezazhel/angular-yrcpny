import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { CustomDragDrop } from './custom-drag-drop-directive.directive';
import { DragContainerComponent } from './drag-container/drag-container.component';
import { DragItem } from './drag-item.model';
import { DragService } from './drag.service';
import { TextItemComponent } from './text-item/text-item.component';

@Component({
  selector: 'drag-root',
  standalone: true,
  imports: [
    DragDropModule,
    DragContainerComponent,
    TextItemComponent,
    CustomDragDrop,
    CommonModule,
  ],
  templateUrl: './drag-root.component.html',
})
export class DragRootComponent {
  public items: DragItem[] = [];

  constructor(public readonly dragService: DragService) {}

  public addContainer() {
    this.items.push(<DragItem>{
      id: `${this.items.length}_container`,
      type: 'Container',
    });
  }
}
