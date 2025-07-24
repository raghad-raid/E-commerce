import { Component, OnInit } from '@angular/core';
import { CartService, product } from '../cart.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
products:product[]=[];

constructor( private cartService: CartService){}
ngOnInit(): void {
  this.cartService.getproducts().subscribe((data) =>{
    this.products=data;
  })
}
  addToCart(product: product) {
    this.cartService.addToCart(product);
  }
}
