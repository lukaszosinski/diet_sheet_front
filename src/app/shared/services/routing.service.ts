import { Injectable } from '@angular/core';
import { NavigationExtras, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  readonly navigation: NavigationTree;

  constructor(private router: Router) {
    this.navigation = {
      dashboard: {
        products: {
          list: this.goToProductsList.bind(this),
        },
        meals: {
          list: this.goToMealsList.bind(this),
        },
      }
    };
  }

  private navigateByUrl(url: string | UrlTree, extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigateByUrl(url, extras);
  }

  goToProductsList(): Promise<boolean> {
    return this.navigateByUrl('dashboard/products');
  }

  goToMealsList(): Promise<boolean> {
    return this.navigateByUrl('dashboard/meals');
  }
}

export interface NavigationTree {
  dashboard: {
    meals: {
      list: NavigationCallback,
    }
    products: {
      list: NavigationCallback,
    },
  };
}

export type NavigationCallback = () => Promise<boolean>;
