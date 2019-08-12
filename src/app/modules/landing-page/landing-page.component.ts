import { Component, OnInit } from '@angular/core';
import * as fromAuthorization from '../authorization/authorization.actions';
import { AppState } from '../../app.recuder';
import { Store } from '@ngrx/store';

@Component({
  selector: 'diet-landing-page',
  template: `
      <button (click)="signIn()">signIn</button>
      <button (click)="signUp()">signUp</button>
  `,
  styleUrls: [ './landing-page.component.scss' ]
})
export class LandingPageComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
  }

  signIn(): void {
    this.store.dispatch(fromAuthorization.signIn({ username: 'asdasdas', password: 'asdasdasdasdasd' }));
  }

  signUp(): void {
    this.store.dispatch(fromAuthorization.signUp({ username: 'asdasdas', password: 'asdasdasdasdasd' }));
  }
}
