import {
CdkDrag,
  CdkDragDrop,
  CdkDragMove,
  CdkDragRelease,
  CdkDropList,
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

  constructor(private readonly dragDropService: DragService) {}

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

  public allowDropPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    return this.dragDropService.isAllowedDrop(drag, drop);
  };
  public dropped(event: CdkDragDrop<DragItem[], DragItem[]>) {
    this.dragDropService.dropped(event);

  }

  public dragMoved(event: CdkDragMove<DragItem>) {
    this.dragDropService.dragMoved(event);
  }

  public dragReleased(event: CdkDragRelease) {
    this.dragDropService.dragReleased(event);
  }
}
