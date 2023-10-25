import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./core/components/page-not-found/page-not-found.component";
import {HomeComponent} from "./modules/home/home.component";
import {LoginComponent} from "./modules/auth/login/login.component";
import {RegisterComponent} from "./modules/auth/register/register.component";
import {ProductComponent} from "./modules/product/product.component";
import {ProductCatalogComponent} from "./modules/product-catalog/product-catalog.component";
import {ProductAccessoriesComponent} from "./modules/product-accessories/product-accessories.component";

const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'all-products', component: ProductComponent},
  { path: 'catalog', component: ProductCatalogComponent},
  { path: 'accessories', component: ProductAccessoriesComponent},
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
