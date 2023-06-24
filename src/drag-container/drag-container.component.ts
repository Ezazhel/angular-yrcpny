import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DragService } from '../drag.service';
import { DragItem } from '../drag-item.model';
import { TextItemComponent } from '../text-item/text-item.component';
import { CustomDragDrop } from '../custom-drag-drop-directive.directive';

@Component({
  selector: 'drag-container',
  standalone: true,
  imports: [DragDropModule, TextItemComponent, CommonModule, CustomDragDrop],
  templateUrl: 'drag-container.component.html',
})
export class DragContainerComponent {
  @Input()
  public item!: DragItem;

  public items: DragItem[] = [];

  constructor(private readonly dragService: DragService) {}

  public addItem() {
    this.items.push(<DragItem>{
      id: `${this.items.length}_item`,
      type: 'Item',
    });
  }

  public addContainer() {
    this.items.push(<DragItem>{
      id: `${this.items.length}_container`,
      type: 'Container',
    });
  }

  public dropped(event: CdkDragDrop<DragItem[], DragItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.previousContainer.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
