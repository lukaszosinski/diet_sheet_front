import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.recuder';
import * as AuthorizationActions from '../../authorization/authorization.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromAuthorization from '../../authorization/authorization.reducer';
import { Observable } from 'rxjs';


@Component({
  selector: 'diet-sign-in',
  template: `
      <form [formGroup]="form">
          <input class="long-input" type="email" autocomplete="email" formControlName="email" placeholder="{{'COMMON.EMAIL' | translate}}">
          <diet-validation-message formControlName="email" [errors]="form.get('email').errors"></diet-validation-message>

          <input class="long-input" type="password" autocomplete="current-password" formControlName="password"
                 placeholder="{{'COMMON.PASSWORD' | translate}}">
          <diet-validation-message formControlName="password" [errors]="form.get('password').errors"></diet-validation-message>

          <diet-button (click)="signIn()"
                       [disabled]="(state | async).processing.signIn">
              {{'LANDING_PAGE.SIGN_IN' | translate}}
          </diet-button>
      </form>
  `,
  styleUrls: [ './sign-in.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {

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
    });
  }

  signIn(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.store.dispatch(AuthorizationActions.signIn({ username: email, password }));
    }
  }
}
