import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { TrashCollectComponent } from './trash-collect/trash-collect.component';

const routes: Routes = [
  { path: '', redirectTo: 'productList', pathMatch: 'full' },
  { path: 'productList', component: ProductListComponent },
  { path: 'productDetails/:productId', component: ProductDetailsComponent },
  { path: 'ProductAddEdit/:productId', component: ProductAddEditComponent },
  { path: 'Trash', component: TrashCollectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
