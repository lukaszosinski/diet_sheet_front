import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Injectable()
export class DashboardScrollPositionService {

  private DASHBOARD_WRAPPER_ID = 'diet-dashboard-content-wrapper';

  constructor() {}

  isScrolledToBottom(threshold: number): Observable<boolean> {
    return fromEvent(this.getDashboardWrapper(), 'scroll')
      .pipe(
        map(() => this.reachedScrollEnd(threshold)),
        startWith(this.reachedScrollEnd(threshold)),
        distinctUntilChanged()
      );
  }

  private reachedScrollEnd(threshold: number): boolean {
    const element = this.getDashboardWrapper();
    return element.scrollTop + element.clientHeight >= element.scrollHeight - threshold;
  }

  private getDashboardWrapper(): HTMLElement {
    return document.getElementById(this.DASHBOARD_WRAPPER_ID)!;
  }
}
