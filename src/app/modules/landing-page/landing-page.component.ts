import { Component } from '@angular/core';
import { RoutingService } from '../shared/routing/routing.service';

@Component({
  selector: 'diet-landing-page',
  template: `
      <div class="diet-landing-page-content">
          <h1>{{'LANDING_PAGE.WELCOME' | translate}}</h1>
          <div class="diet-landing-page-authorization">
              <diet-sign-in></diet-sign-in>
              <diet-button type="button" class="diet-button-secondary"
                           (click)="goToSignUp()">{{'LANDING_PAGE.SIGN_UP' | translate }}</diet-button>
          </div>
      </div>
  `,
  styleUrls: [ './landing-page.component.scss' ]
})
export class LandingPageComponent {

  constructor(private routing: RoutingService) {}

  goToSignUp(): void {
    this.routing.navigation.landingPage.signUp();
  }
}
