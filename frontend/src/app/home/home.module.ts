import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SharedModule } from '../shared/shared.module';
import { ManualPageComponent } from './pages/manual-page/manual-page.component';
import { ChangeLogPageComponent } from './pages/change-log-page/change-log-page.component';
import { StepCardComponent } from './components/step-card/step-card.component';
import { MaterialModule } from '../material/material.module';
import { ChangeLogItemComponent } from './components/change-log-item/change-log-item.component';


@NgModule({
  declarations: [
    HomePageComponent,
    LayoutPageComponent,
    ManualPageComponent,
    ChangeLogPageComponent,
    StepCardComponent,
    ChangeLogItemComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class HomeModule { }
