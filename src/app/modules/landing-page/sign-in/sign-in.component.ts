import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.recuder';
import * as fromAuthorization from '../../authorization/authorization.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'diet-sign-in',
  template: `
      <form [formGroup]="signInForm">
          <input type="text" formControlName="email" placeholder="{{'COMMON.EMAIL' | translate}}">
          <input type="text" formControlName="password" placeholder="{{'COMMON.PASSWORD' | translate}}">
          <diet-button (click)="signIn()">{{'LANDING_PAGE.SIGN_IN' | translate}}</diet-button>
      </form>
  `,
  styleUrls: [ './sign-in.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup = this.fb.group({});

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) { }

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
      this.store.dispatch(fromAuthorization.signIn({ username: email, password }));
    }
  }
}
