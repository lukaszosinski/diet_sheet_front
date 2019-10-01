import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.recuder';
import * as AuthorizationActions from '../../authorization/authorization.actions';
import * as fromAuthorization from '../../authorization/authorization.reducer';
import { matchingPasswordsValidator } from '../../shared/validators';

@Component({
  selector: 'diet-sign-up',
  template: `
      <img src="assets/images/logo.svg" alt="PanTry logo">
      <form class="diet-form" [formGroup]="form">
          <input class="long-input" type="email" formControlName="email" autocomplete="email" placeholder="{{'COMMON.EMAIL' | translate}}">
          <diet-validation-message formControlName="email" [errors]="form.get('email')?.errors"></diet-validation-message>

          <input class="long-input" type="password" formControlName="password" autocomplete="new-password"
                 placeholder="{{'COMMON.PASSWORD' | translate}}">
          <diet-validation-message formControlName="password" [errors]="form.get('password')?.errors"></diet-validation-message>

          <input class="long-input" type="password" formControlName="confirmPassword" autocomplete="new-password"
                 placeholder="{{'LANDING_PAGE.CONFIRM_PASSWORD' | translate}}">
          <diet-validation-message formControlName="confirmPassword"
                                   [errors]="form.get('confirmPassword')?.errors"></diet-validation-message>

          <diet-button (click)="signUp()"
                       [disabled]="(state | async).processing.signUp">
              {{'LANDING_PAGE.SIGN_UP' | translate}}
          </diet-button>
      </form>
  `,
  styleUrls: [ './sign-up.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  readonly state: Observable<fromAuthorization.State>;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
  ) {
    this.state = this.store.select(fromAuthorization.selectAuthorization);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required ],
      confirmPassword: [ '' ]
    }, {
      validators: matchingPasswordsValidator
    });
  }

  signUp(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.store.dispatch(AuthorizationActions.signUp({ username: email, password }));
    }
  }

}
