import {
  CdkDrag,
  CdkDragDrop,
  CdkDragMove,
  CdkDragRelease,
  CdkDropList,
  DragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, share, shareReplay, Subject } from 'rxjs';
import { DragItem } from './drag-item.model';

@Injectable({
  providedIn: 'root',
})
export class DragService {
  private connectedList$ = new BehaviorSubject<string[]>([]);
  public list$: Observable<string[]> = this.connectedList$.pipe(shareReplay());

  currentHoverDropListId?: string;
  controlDropped: Subject<DragItem> = new Subject<DragItem>();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  public dragMoved(event: CdkDragMove<DragItem>) {
    let elementFromPoint = this.document.elementFromPoint(
      event.pointerPosition.x,
      event.pointerPosition.y
    );

    if (!elementFromPoint) {
      this.currentHoverDropListId = undefined;
      return;
    }

    if (elementFromPoint.classList.contains('no-drop')) {
      this.currentHoverDropListId = 'no-drop';
      return;
    }

    let dropList = elementFromPoint.classList.contains('cdk-drop-list')
      ? elementFromPoint
      : elementFromPoint.closest('.cdk-drop-list');

    if (!dropList) {
      this.currentHoverDropListId = undefined;
      return;
    }

    this.currentHoverDropListId = dropList.id;
  }

  public isAllowedDrop(drag: CdkDrag, drop: CdkDropList) {
    if (this.currentHoverDropListId == null) {
      return true;
    }

    return drop.id === this.currentHoverDropListId;
  }
  public dropped(event: CdkDragDrop<DragItem[], DragItem[]>) {
    if (event.previousContainer == event.container) {
      moveItemInArray(
        event.container.data,
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

  dragReleased(event: CdkDragRelease) {
    this.currentHoverDropListId = undefined;
  }

  public register(id: string) {
    if (!id || this.connectedList$.value.includes(id)) {
      return;
    }
    this.connectedList$.next([id, ...this.connectedList$.value]);
  }

  public unregister(id: string) {
    this.connectedList$.next(
      this.connectedList$.value.filter((_id) => _id != id)
    );
  }
}
