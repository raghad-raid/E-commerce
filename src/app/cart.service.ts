import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface product{
  id:number;
  title:string;
  price:number;
  category:string;
  image:string;
  description:string;
  rating:{
    rate:number,
    count:number
  }
}
export interface CartItem {
  product: product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  private apiUrl='https://fakestoreapi.com/products';

  private cartItem: CartItem[]=[];

  private cartItemsSubject=new BehaviorSubject <CartItem[]>([]);
  cartItem$=this.cartItemsSubject.asObservable();
  
  constructor(private http:HttpClient) { 
    this.loadCartFromLocalStorage();

  }
  getproducts(): Observable<product[]>{
    return this.http.get<product[]>(this.apiUrl)
  }
  addToCart(product:product){
   const existingItem  = this.cartItem.find(item => item.product.id === product.id);

  if (existingItem ) {
    existingItem.quantity +=1;}
    else{
      this.cartItem.push({product , quantity:1});
    }
    
    this.cartItemsSubject.next(this.cartItem);
    this.saveCartToLocalStorage();
  }
    
  getCartItem():CartItem[] {
    return this.cartItem;
  }
  removeFromCart(productId:number){
    this.cartItem=this.cartItem.filter( Item=> Item.product.id !==productId);
    this.cartItemsSubject.next(this.cartItem);
     this.saveCartToLocalStorage();
  }
 
    private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItem));
  }
   private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItem = JSON.parse(storedCart);
      this.cartItemsSubject.next(this.cartItem);
    }
  }
  updateCart(){
    this.cartItemsSubject.next(this.cartItem);
    this.saveCartToLocalStorage();
  }

}

