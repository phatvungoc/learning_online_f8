import { HomeComponent } from './home.component';
import { SharedModule } from './../../shared/shared-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [HomeComponent, SliderComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
