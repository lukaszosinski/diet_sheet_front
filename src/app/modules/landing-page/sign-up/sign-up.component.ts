import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuthorization from '../../authorization/authorization.actions';

@Component({
  selector: 'diet-sign-up',
  template: `
      <diet-button (click)="signUp()">{{'LANDING_PAGE.SIGN_UP' | translate}}</diet-button>
  `,
  styleUrls: [ './sign-up.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

  signUp(): void {
    this.store.dispatch(fromAuthorization.signUp({ username: 'asdasdas', password: 'asdasdasdasdasd' }));
  }
}
