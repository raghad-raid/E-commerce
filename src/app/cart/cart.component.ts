import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
 styleUrls: ['./cart.component.css']

})
export class CartComponent implements OnInit{
  cartItems: CartItem[] = [];
product: any;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItem$.subscribe((items: CartItem[]) => {
      this.cartItems = items;
    });
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  getTotal(){
    return this.cartItems.reduce((sum,item) =>sum + item.product.price * item.quantity , 0);
  }
  getItemCount(){
    return this.cartItems.reduce((count ,item )=>count +item.quantity,0);
  }
  increaseQuantity(item:CartItem){
    item.quantity +=1;
    this.cartService.updateCart();
  }
  decreaseQuantity(item:CartItem){
    if(item.quantity>1){
      item.quantity -=1;
      this.cartService.updateCart();
    }else{
      this.removeItem(item.product.id);
    }
  }


  
}
