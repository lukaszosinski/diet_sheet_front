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
      <form [formGroup]="signInForm">
          <input id="signInEmail" type="text" formControlName="email" placeholder="{{'COMMON.EMAIL' | translate}}">
          <diet-validation-message formControlName="email" [errors]="signInForm.get('email').errors"></diet-validation-message>

          <input type="text" formControlName="password" placeholder="{{'COMMON.PASSWORD' | translate}}">
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

  signInForm: FormGroup = this.fb.group({});
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
    this.signInForm = this.fb.group({
      email: [ '', Validators.required ],
      password: [ '', Validators.required ],
    });
  }

  signIn(): void {
    this.signInForm.markAllAsTouched();
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.store.dispatch(AuthorizationActions.signIn({ username: email, password }));
    }
  }
}
