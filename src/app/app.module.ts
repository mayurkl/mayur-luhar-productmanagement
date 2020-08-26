// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimecustomModuleModule } from './primecustom-module/primecustom-module.module';
import {AngularMaterialModule } from './angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxImageZoomModule } from 'ngx-image-zoom';

// components
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { TrashCollectComponent } from './trash-collect/trash-collect.component';
import { SidenavComponent } from './Shared/sidenav/sidenav.component';
import { HeaderComponent } from './Shared/header/header.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductOperationsDataService } from './product-operations-data.service';
import { ConfirmationService } from 'primeng/api';



@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProductAddEditComponent,
    TrashCollectComponent,
    SidenavComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimecustomModuleModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgxImageZoomModule,
    FormsModule,
    ReactiveFormsModule ,
  ],

  providers: [ProductOperationsDataService, ConfirmationService ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
