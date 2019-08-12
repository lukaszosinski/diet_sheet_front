import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardActivationGuard } from './dashboard.activation-guard';
import { LandingPageActivationGuard } from './landing-page.activation-guard';

export enum APP_ROUTES {
  DASHBOARD = 'dashboard',
  LANDING_PAGE = 'landing-page',
}

const routes: Routes = [
  {
    path: APP_ROUTES.DASHBOARD,
    canActivate: [ DashboardActivationGuard ],
    loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: APP_ROUTES.LANDING_PAGE,
    canActivate: [ LandingPageActivationGuard ],
    loadChildren: () => import('../modules/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '*', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    DashboardActivationGuard,
    LandingPageActivationGuard,
  ]
})
export class AppRoutingModule {
}
