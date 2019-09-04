import { Directive, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[noClickPropagation]'
})
export class NoClickBubblingDirective {

  @HostListener('click', [ '$event' ])
  onClick(event: Event): void {
    event.stopPropagation();
  }
}
