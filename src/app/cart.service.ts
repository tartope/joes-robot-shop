import { Injectable } from '@angular/core';
import { IProduct } from './catalog/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: IProduct[] = [];

  constructor(private http: HttpClient) { }

  add(product: IProduct){
    this.cart.push(product);
    // Pass 2 parameters: the route, and the cart object (the data to be sent up to the server)
    this.http.post('/api/cart', this.cart).subscribe(()=>{
      console.log(`product ${product.name} added to cart`);
    })
  }

}
