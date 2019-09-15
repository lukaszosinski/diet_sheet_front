import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { RoutingService } from '../../../../../shared/routing/routing.service';

@Component({
  selector: 'diet-stats-meter',
  template: `
      <div class="diet-stats-meter-content">
          <div class="diet-stats-meter-header">
              <span>{{meterName}}</span>
          </div>
          <div class="diet-stats-meter-wrapper">
              <meter #meterElement
                     min="0"
                     [value]="value"
                     [max]="max"
                     [optimum]="optimum"
              ></meter>
              <div #minValueElement
                   *ngIf="shouldDisplayValueElements"
                   class="diet-stats-meter-min"
                   title="{{'COMMON.MIN_VALUE' | translate}}"
                   (click)="onValueElementClick()"></div>
              <div #maxValueElement
                   *ngIf="shouldDisplayValueElements"
                   class="diet-stats-meter-max"
                   title="{{'COMMON.MAX_VALUE' | translate}}"
                   (click)="onValueElementClick()"></div>
          </div>
          <div class="diet-stats-meter-values">
              <span>{{value}} {{unit}} / {{total}} {{unit}}</span>
          </div>
      </div>
  `,
  styleUrls: [ './stats-meter.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsMeterComponent implements AfterViewInit, OnChanges {

  @ViewChild('meterElement', { static: false }) meterElement!: ElementRef;
  @ViewChild('minValueElement', { static: false }) minValueElement!: ElementRef;
  @ViewChild('maxValueElement', { static: false }) maxValueElement!: ElementRef;

  @Input() meterName?: string;
  @Input() value: number = 0;
  @Input() total: number = 0;
  @Input() lowValue?: number;
  @Input() highValue?: number;
  @Input() unit: string = '';

  constructor(private routingService: RoutingService) {}


  ngAfterViewInit(): void {
    if (this.highValue) {
      this.meterElement.nativeElement.high = this.highValue;
    }
    if (this.lowValue) {
      this.meterElement.nativeElement.low = this.lowValue;
    }
    if (this.shouldDisplayValueElements) {
      this.setValueElementsPositions();
    }
  }

  private setValueElementsPositions(): void {
    const meterWidth = this.meterElement.nativeElement.clientWidth;
    const minValueElement = this.minValueElement.nativeElement;
    const maxValueElement = this.maxValueElement.nativeElement;
    this.setValueElementPosition(minValueElement, meterWidth * this.lowValue! / this.max - minValueElement.offsetWidth / 2 - 2);
    this.setValueElementPosition(maxValueElement, meterWidth * this.highValue! / this.max - maxValueElement.offsetWidth / 2 - 2);
  }

  private setValueElementPosition(arrow: HTMLDivElement, leftOffset: number): void {
    arrow.style.left = leftOffset.toFixed(2).toString() + 'px';
  }

  ngOnChanges(): void {

  }

  get max(): number {
    return Math.max(this.total, this.highValue || 0);
  }

  get optimum(): number {
    return this.value > this.highValue! ? 0 : this.lowValue!;
  }

  get shouldDisplayValueElements(): boolean {
    return this.lowValue !== undefined && this.highValue !== undefined;
  }

  onValueElementClick(): void {
    this.routingService.navigation.dashboard.settings();
  }
}
