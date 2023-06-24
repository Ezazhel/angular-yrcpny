import { CdkDropList } from '@angular/cdk/drag-drop';
import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { DragService } from './drag.service';

@Directive({
  selector: '[custom-drag-drop]',
  standalone: true,
})
export class CustomDragDrop implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor(
    private readonly dropList: CdkDropList,
    private readonly dragService: DragService
  ) {}

  ngOnInit() {
    this.dragService.register(this.dropList.id);
    this.subscription.add(
      this.dragService.list$
        .pipe(
          tap((list) => {
            this.dropList.connectedTo = list;
            console.log('connectdTo', this.dropList.connectedTo);
          })
        )
        .subscribe()
    );
  }
  ngOnDestroy() {
    this.dragService.unregister(this.dropList.id);

    this.subscription.unsubscribe();
  }
}
