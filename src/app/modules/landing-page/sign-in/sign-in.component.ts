import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.recuder';
import * as fromAuthorization from '../../authorization/authorization.actions';

@Component({
  selector: 'diet-sign-in',
  template: `
      <diet-button (click)="signIn()">{{'LANDING_PAGE.SIGN_IN' | translate}}</diet-button>
  `,
  styleUrls: [ './sign-in.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  signIn(): void {
    this.store.dispatch(fromAuthorization.signIn({ username: 'asdasdas', password: 'asdasdasdasdasd' }));
  }
}
