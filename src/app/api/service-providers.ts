import { AuthorizationService } from './services/authorization.service';
import { MealService } from './services/meal.service';
import { ProductService } from './services/product.service';
import { DaysService } from './services/days.service';
import {ShoppingListService} from './services/shopping-list.service';

export const serviceProviders = [
  AuthorizationService,
  MealService,
  ProductService,
  DaysService,
  ShoppingListService
];
