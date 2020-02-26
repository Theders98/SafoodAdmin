import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PanelComponent } from './panel/panel.component';
import { DashboardComponent } from './panel/dashboard/dashboard.component';
import { FoodsComponent } from './panel/foods/foods.component';
import { AllergensComponent } from './panel/allergens/allergens.component';
import { CategoriesComponent } from './panel/categories/categories.component';
import { UsersComponent } from './panel/users/users.component';
import { RestaurantsComponent } from './panel/restaurants/restaurants.component';


const routes: Routes = [
  { path: '', component: PanelComponent, canActivate: [AuthGuard], children: [
    { path: '', component: DashboardComponent },
    { path: 'foods', component: FoodsComponent },
    { path: 'allergens', component: AllergensComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'restaurants', component: RestaurantsComponent },
    { path: 'users', component: UsersComponent },
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }