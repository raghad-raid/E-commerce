import { Component, OnInit } from '@angular/core';
import { CartService, product } from '../cart.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
products: product[] = [];
electronics: product[] = [];
mens: product[] = [];
womens: product[] = [];
jewelry: product[] = [];

constructor(private cartService: CartService) {}

ngOnInit() {
  this.cartService.getproducts().subscribe((data) => {

    this.products = data;
    this.electronics = data.filter(p => p.category === 'electronics');
    this.mens = data.filter(p => p.category === "men's clothing");
    this.womens = data.filter(p => p.category === "women's clothing");
    this.jewelry = data.filter(p => p.category === "jewelery");
  });
}

addToCart(product: product) {
  this.cartService.addToCart(product);
}

}
