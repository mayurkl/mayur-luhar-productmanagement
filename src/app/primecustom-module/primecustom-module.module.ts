import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TooltipModule } from 'primeng/tooltip';
import { RatingModule } from 'primeng/rating';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import {InputTextModule} from 'primeng/inputtext';
import {FieldsetModule} from 'primeng/fieldset';
import {MultiSelectModule} from 'primeng/multiselect';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    SidebarModule,
    BrowserAnimationsModule,
    DataViewModule,
    TooltipModule,
    RatingModule,
    BreadcrumbModule,
    PanelModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextModule,
    FieldsetModule,
    MultiSelectModule,
    ConfirmDialogModule

  ],
  exports: [
    CommonModule,
    ButtonModule,
    SidebarModule,
    DataViewModule,
    TooltipModule,
    RatingModule,
    BreadcrumbModule,
    PanelModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextModule,
    FieldsetModule,
    MultiSelectModule,
    ConfirmDialogModule,

  ],
})
export class PrimecustomModuleModule {}
