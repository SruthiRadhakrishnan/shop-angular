import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
    cart: Cart = {items:[
      {
        product:'http://via.placeholder.com/150',
        name: 'Snickers',
        price: 150,
        quantity: 1,
        id: 1
      },
      {
        product:'http://via.placeholder.com/150',
        name: 'Snickers',
        price: 150,
        quantity: 2,
        id: 2
      }
    ]}
    dataSource: Array<CartItem> = [];
    displayedColumns: Array<string> = [
      'product',
      'name',
      'price',
      'quantity',
      'total',
      'action'
    ]

    constructor(private cartService: CartService,private httpClient:HttpClient){}

    ngOnInit():void{
      this.dataSource=this.cart.items;
      this.cartService.cart.subscribe((_cart:Cart)=>{
        this.cart=_cart;
        this.dataSource = this.cart.items;
      })
    }

    getTotal(items: Array<CartItem>):number{
      return this.cartService.getTotal(items);
    }

    onClearCart():void{
      this.cartService.clearCart();
    }

    onRemoveFromCart(item:CartItem):void{
       this.cartService.removeFromCart(item);
    }

    onAddQuantity(item: CartItem):void{
      this.cartService.addToCart(item);
    }

    onRemoveQuantity(item:CartItem):void{
       this.cartService.removeQuantity(item);
    }

    onCheckout():void{
       this.httpClient.post('http://localhost:4242/checkout',{
        items:this.cart.items
       }).subscribe(async(res:any)=>{
        let stripe = await loadStripe('pk_test_51MTkc7JOc5V8n8LXKvJLUPxT9AEfxe2pTPXzSfMzE60HWT4H5kGhyDG16mrzZAqwHDKUFWCeCO0x1jc5cjmNYFkN00gaElgUkJ');
        stripe?.redirectToCheckout({
          sessionId : res.id
        })
       })
    }
}
