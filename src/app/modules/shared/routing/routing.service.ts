import { Injectable } from '@angular/core';
import { NavigationExtras, Params, Router } from '@angular/router';
import { formatToIsoDate } from '../utils/date-utils';

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
          details: this.goToProductDetails.bind(this),
        },
        meals: {
          list: this.goToMealsList.bind(this),
          details: this.goToMealDetails.bind(this),
        },
        dayPlan: this.goToDayPlan.bind(this),
        shoppingList: {
          details: this.goToShoppingList.bind(this),
          list: this.goToSavedShoppingLists.bind(this),
        },
        settings: this.goToSettings.bind(this),
        fridge: this.goToFridge.bind(this),
      },
      landingPage: {
        go: this.goToLandingPage.bind(this),
        signUp: this.goToSignUp.bind(this),
      }
    };
  }

  private navigate(url: string[], extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate(url, extras);
  }

  private goToLandingPage(): Promise<boolean> {
    return this.navigate([ 'landing-page' ]);
  }

  private goToSignUp(): Promise<boolean> {
    return this.navigate([ 'landing-page/sign-up' ]);
  }

  private goToDashboard(): Promise<boolean> {
    return this.navigate([ 'dashboard' ]);
  }

  private goToProductsList(): Promise<boolean> {
    return this.navigate([ 'dashboard/products' ]);
  }

  private goToProductDetails(productId: string = 'create'): Promise<boolean> {
    return this.navigate([ 'dashboard/products/', productId ]);
  }

  private goToMealsList(): Promise<boolean> {
    return this.navigate([ 'dashboard/meals' ]);
  }

  private goToMealDetails(mealId: string = 'create', skipLocationChange: boolean = false, redirectUrl?: string): Promise<boolean> {
    return this.navigate([ 'dashboard/meals/', mealId ], { skipLocationChange, queryParams: { redirectUrl } });
  }

  private goToDayPlan(date: Date = new Date(), skipLocationChange: boolean = false): Promise<boolean> {
    const selectedDateString = formatToIsoDate(date);
    return this.navigate([ 'dashboard/day-plan', selectedDateString ], { skipLocationChange });
  }

  private goToShoppingList(shoppingListId: string = 'create'): Promise<boolean> {
    return this.navigate(['dashboard/shopping-list', shoppingListId]);
  }

  private goToSavedShoppingLists(): Promise<boolean> {
    return this.navigate(['dashboard/shopping-list']);
  }

  private goToSettings(): Promise<boolean> {
    return this.navigate([ 'dashboard/settings' ]);
  }

  private goToFridge(): Promise<boolean> {
    return this.navigate([ 'dashboard' ]);
  }

  navigateByUrl(url: string, newQueryParams?: Params): Promise<boolean> {
    const path = url.split('?')[0];
    const urlQueryParams = this.router.parseUrl(url).queryParams;
    const queryParams = { ...urlQueryParams, ...newQueryParams };
    return this.router.navigate([ path ], { queryParams });
  }
}

export interface NavigationTree {
  dashboard: {
    go: NavigationCallback,
    meals: {
      list: NavigationCallback,
      details: NavigationCallback,
    }
    products: {
      list: NavigationCallback,
      details: NavigationCallback,
    },
    dayPlan: NavigationCallback,
    shoppingList: {
      list: NavigationCallback,
      details: NavigationCallback,
    },
    settings: NavigationCallback,
    fridge: NavigationCallback,
  };
  landingPage: {
    go: NavigationCallback,
    signUp: NavigationCallback,
  };
}

export type NavigationCallback = (...args: any) => Promise<boolean>;
