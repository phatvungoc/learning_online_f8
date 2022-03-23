import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';



@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule
  ],
  exports:[
    ShoppingCartComponent
  ]
})
export class ShoppingCartModule { }
