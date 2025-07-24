import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService, product } from '../cart.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
product:any;
constructor(private route:ActivatedRoute ,  
            private http:HttpClient ,
            private cartService:CartService){}
ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`https://fakestoreapi.com/products/${id}`).subscribe(data => {
      this.product = data;
    });
}
 addToCart(product: product) {
    this.cartService.addToCart(product);
  }
}
