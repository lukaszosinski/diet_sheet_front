import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { OnDestroyAbstract } from '../../../shared/utils/abstract-injectables/on-destroy-abstract';
import { takeUntilDestroy } from '../../../shared/utils/rxjs-utils';

@Component({
  selector: 'diet-entity-item-table',
  template: `
      <div class="diet-entity-item-table">
          <div class="diet-entity-item-table-title">{{tableTitle | uppercase}}</div>
          <div class="diet-entity-item-table-wrapper" *ngIf="itemsFormArray" [formGroup]="itemsFormArray">
              <div class="diet-entity-item-table-header-row">
                  <div *ngFor="let header of columnHeaders; let i = index"
                       class="diet-entity-item-table-header-row-{{i}}">{{header}}:
                  </div>
              </div>
              <ng-container *ngFor="let item of itemsFormArray.controls; let i = index">
                  <div [formGroupName]="i" class="diet-entity-item-table-row">
                      <div class="diet-entity-item-table-row-delete" (click)="onDeleteClick(i)"></div>
                      <div class="diet-entity-item-table-row-name">{{getName(i)}}</div>
                      <input type="number" class="diet-entity-item-table-row-quantity" formControlName="amount">
                      <div class="diet-entity-item-table-row-unit">{{getUnit(i)}}</div>
                  </div>
              </ng-container>
          </div>
          <diet-add-button class="diet-entity-item-table-add-item" (click)="onAddButtonClick($event)"></diet-add-button>
      </div>
  `,
  styleUrls: [ './diet-entity-item-table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DietEntityItemTableComponent extends OnDestroyAbstract implements OnInit {
  // itemsFormArray value must be of type DietEntityItem[]
  @Input() itemsFormArray!: FormArray;
  @Input() tableTitle: string = '';
  @Input() columnHeaders: string[] = [];
  @Output() addButtonClick: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() deleteClick: EventEmitter<number> = new EventEmitter<number>();

  constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.itemsFormArray.valueChanges
      .pipe(takeUntilDestroy(this))
      .subscribe(() => this.changeDetector.markForCheck());
  }

  onAddButtonClick($event: Event): void {
    this.addButtonClick.emit($event);
  }

  private getItem(i: number): DietEntityItem | undefined {
    return this.itemsFormArray.getRawValue()[i];
  }

  getName(i: number): string {
    const item = this.getItem(i);
    return item && item.name || '';
  }

  getUnit(i: number): string {
    const item = this.getItem(i);
    return item && item.unit || 'kg';
  }

  onDeleteClick(index: number): void {
    this.deleteClick.emit(index);
  }
}

interface DietEntityItem {
  name: string;
  amount: number;
  unit: string;
}
