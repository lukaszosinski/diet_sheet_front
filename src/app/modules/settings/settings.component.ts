import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.recuder';
import { Observable } from 'rxjs';
import * as fromSettings from './settings.reducer';
import * as SettingsActions from './settings.actions';
import { SexEnum } from './models/sex.enum';
import { PhysicalActivityEnum } from './models/physical-activity.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserData } from './models/user-data.model';
import { DietLimits } from './models/diet-limits.model';
import { filter, map } from 'rxjs/operators';
import { takeUntilDestroy } from '../shared/utils/rxjs-utils';
import { OnDestroyAbstract } from '../shared/utils/abstract-injectables/on-destroy-abstract';
import { BMIStatusEnum } from './models/bmi-status.enum';
import { DietLimitsCalculationStrategyEnum } from './models/diet-limits-calculation-strategy.enum';
import { UserPreferences } from './models/user-preferences.model';

@Component({
  selector: 'diet-settings',
  template: `
      <div class="diet-settings-content">
          <div class="diet-settings-card">
              <div class="user-data-form" [formGroup]="userDataForm">
                  <h1 class="user-data-form-header">Dane użytkownika</h1>
                  <diet-input [type]="'number'" [label]="'SETTINGS.LABELS.age' | translate" formControlName="age"></diet-input>
                  <diet-input [type]="'number'" [label]="'SETTINGS.LABELS.height' | translate" formControlName="height"></diet-input>
                  <diet-input [type]="'number'" [label]="'SETTINGS.LABELS.weight' | translate" formControlName="weight"></diet-input>
                  <diet-select [optionsEnum]="SexEnum"
                               [i18nKeyPrefix]="'ENUM.SexEnum.'"
                               [label]="'SETTINGS.LABELS.sex' | translate"
                               [formControlName]="'sex'"
                  ></diet-select>
                  <diet-select [optionsEnum]="PhysicalActivityEnum"
                               [i18nKeyPrefix]="'ENUM.PhysicalActivityEnum.'"
                               [label]="'SETTINGS.LABELS.physicalActivity' | translate"
                               formControlName="physicalActivity"
                  ></diet-select>
              </div>
              <div class="user-preferences-form" [formGroup]="userPreferencesForm">
                  <diet-select [optionsEnum]="DietLimitsCalculationStrategyEnum"
                               [i18nKeyPrefix]="'ENUM.DietLimitsCalculationStrategyEnum.'"
                               [label]="'SETTINGS.LABELS.strategyEnum' | translate"
                               formControlName="strategyEnum"
                               [optional]="true"
                  ></diet-select>
              </div>
          </div>

          <div class="diet-limits" *ngIf="shouldDisplayDietLimits() | async">
              <diet-input [label]="'SETTINGS.LABELS.bmiStatus' | translate"
                          [value]="'ENUM.BMIStatusEnum.' + (getBMIStatus() | async) | translate"
                          [readonly]="true"
              ></diet-input>
              <div class="diet-limits-form" [formGroup]="dietLimitsForm">
                  <div class="diet-limits-form-label">{{'SETTINGS.LABELS.minLimits' | translate}}:</div>
                  <diet-entity-summary class="diet-limits-form-min" [summaryFormGroup]="getMinLimitsForm()"></diet-entity-summary>
                  <div class="diet-limits-form-label">{{'SETTINGS.LABELS.maxLimits' | translate}}:</div>
                  <diet-entity-summary class="diet-limits-form-max" [summaryFormGroup]="getMaxLimitsForm()"></diet-entity-summary>
              </div>
          </div>

          <div class="diet-settings-bottom-actions">
              <diet-button (click)="onSaveUserDataClick()">
                  {{'COMMON.SAVE' | translate}}
              </diet-button>
          </div>
      </div>
  `,
  styleUrls: [ './settings.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent extends OnDestroyAbstract implements OnInit {

  readonly SexEnum: typeof SexEnum = SexEnum;
  readonly PhysicalActivityEnum: typeof PhysicalActivityEnum = PhysicalActivityEnum;
  readonly DietLimitsCalculationStrategyEnum: typeof DietLimitsCalculationStrategyEnum = DietLimitsCalculationStrategyEnum;

  readonly userDataForm: FormGroup;
  readonly dietLimitsForm: FormGroup;
  readonly userPreferencesForm: FormGroup;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
    this.userDataForm = this.createUserDataForm();
    this.dietLimitsForm = this.createDietLimitsForm();
    this.userPreferencesForm = this.createUserPreferencesForm();
  }

  ngOnInit(): void {
    this.store.dispatch(SettingsActions.loadUserData());
    this.store.dispatch(SettingsActions.loadPreferences());
    this.selectDietLimits()
      .subscribe((dietLimits) => {
        this.dietLimitsForm.patchValue(dietLimits);
        this.changeDetectorRef.markForCheck();
      });
    this.selectUserData()
      .subscribe((userData) => {
        this.userDataForm.patchValue(userData);
        this.changeDetectorRef.markForCheck();
      });
    this.selectUserPreferences()
      .subscribe((preferences) => {
        this.userPreferencesForm.patchValue(preferences);
        this.changeDetectorRef.markForCheck();
      });
  }

  private createUserDataForm(): FormGroup {
    return this.fb.group({
      age: undefined,
      height: undefined,
      weight: undefined,
      sex: SexEnum.UNDEFINE,
      physicalActivity: PhysicalActivityEnum.VERY_LOW,
    });
  }

  private createDietLimitsForm(): FormGroup {
    return this.fb.group({
      minLimits: this.createSummaryFormGroup(),
      maxLimits: this.createSummaryFormGroup(),
    });
  }

  private createSummaryFormGroup(): FormGroup {
    return this.fb.group({
      kcal: undefined,
      proteins: undefined,
      carbs: undefined,
      fat: undefined,
      roughage: undefined,
    });
  }

  private createUserPreferencesForm(): FormGroup {
    return this.fb.group({
      strategyEnum: undefined,
    });
  }

  getMinLimitsForm(): FormGroup {
    return this.dietLimitsForm.get('minLimits') as FormGroup;
  }

  getMaxLimitsForm(): FormGroup {
    return this.dietLimitsForm.get('maxLimits') as FormGroup;
  }

  private selectUserData(): Observable<UserData> {
    return this.store.select(fromSettings.selectUserData)
      .pipe(
        filter(Boolean),
        takeUntilDestroy(this)
      );
  }

  private selectDietLimits(): Observable<DietLimits> {
    return this.store.select(fromSettings.selectDietLimits)
      .pipe(
        filter(Boolean),
        takeUntilDestroy(this)
      );
  }

  private selectUserPreferences(): Observable<UserPreferences> {
    return this.store.select(fromSettings.selectUserPreferences)
      .pipe(
        filter(Boolean),
        takeUntilDestroy(this)
      );
  }

  getBMIStatus(): Observable<BMIStatusEnum> {
    return this.selectUserData()
      .pipe(
        map((userData) => userData.bmiStatus),
        filter((bmiStatus) => bmiStatus !== BMIStatusEnum.UNDEFINED)
      );
  }

  shouldDisplayDietLimits(): Observable<boolean> {
    return this.getBMIStatus().pipe(map(Boolean));
  }

  onSaveUserDataClick(): void {
    const preferences: UserPreferences = this.userPreferencesForm.value;
    const userData: UserData = this.userDataForm.value;
    this.store.dispatch(SettingsActions.updatePreferencesAndUserData({ userData, preferences }));
  }
}
