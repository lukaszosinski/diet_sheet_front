import { Injectable } from '@angular/core';
import { NavigationExtras, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// TODO navigation could be made using https://ngrx.io/guide/migration/v4#ngrxrouter-store
export class RoutingService {

  readonly navigation: NavigationTree;

  constructor(private router: Router) {
    this.navigation = {
      dashboard: {
        go: this.goToDashboard.bind(this),
        products: {
          list: this.goToProductsList.bind(this),
        },
        meals: {
          list: this.goToMealsList.bind(this),
        },
        dayPlan: this.goToDayPlan.bind(this),
      },
      landingPage: {
        go: this.goToLandingPage.bind(this),
        signUp: this.goToSignUp.bind(this),
      }
    };
  }

  private navigateByUrl(url: string | UrlTree, extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigateByUrl(url, extras);
  }

  private goToLandingPage(): Promise<boolean> {
    return this.navigateByUrl('landing-page');
  }

  private goToSignUp(): Promise<boolean> {
    return this.navigateByUrl('landing-page/sign-up');
  }

  private goToDashboard(): Promise<boolean> {
    return this.navigateByUrl('dashboard');
  }

  private goToProductsList(): Promise<boolean> {
    return this.navigateByUrl('dashboard/products');
  }

  private goToMealsList(): Promise<boolean> {
    return this.navigateByUrl('dashboard/meals');
  }

  private goToDayPlan(): Promise<boolean> {
    return this.navigateByUrl('dashboard/day-plan');
  }
}

export interface NavigationTree {
  dashboard: {
    go: NavigationCallback,
    meals: {
      list: NavigationCallback,
    }
    products: {
      list: NavigationCallback,
    },
    dayPlan: NavigationCallback,
  };
  landingPage: {
    go: NavigationCallback,
    signUp: NavigationCallback,
  };
}

export type NavigationCallback = () => Promise<boolean>;
