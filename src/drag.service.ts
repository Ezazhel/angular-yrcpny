import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DragService {
  private connectedList$ = new BehaviorSubject<string[]>([]);
  public list$: Observable<string[]> = this.connectedList$.asObservable();
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
