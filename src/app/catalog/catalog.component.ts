import { Component } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  // Changed the property to an array data type
  // The ! tells TS to ignore that it's not initialized and assume it always has a value
  products!: IProduct[];
  // Filter property for button filters
  filter: string = '';


  constructor(
    private cartSvc: CartService, 
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ){ }

  ngOnInit(){
    this.productSvc.getProducts().subscribe(products =>{
      // products to the right of the assignment operator is the data coming from the server, and it's being assigned to the products property of the catalog.
      this.products = products;
    });
    // Uses the ActivatedRoute service and uses the filter property.  Grabs the params off of the route snapshot.  Setups up filter navigation from robot parts on home page
    // this.filter = this.route.snapshot.params['filter'];

    // Instead of using snapshot, we really want to setup a subscription that listens to changes to the route parameters.
    this.route.queryParams.subscribe((params)=>{
      // If a filter isn't provided, set the filter to an empty string
      this.filter = params['filter'] ?? "";
    })
  }

  addToCart(product: IProduct){
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
  }

  getDiscountedClasses(product: IProduct){
    // Return the strikethrough object
    // return { strikethrough: product.discount > 0 }

    // OR just return a string
    if(product.discount > 0) return 'strikethrough';
    else return '';
  }

  getFilteredProducts(){
    // If the filter is an empty string
    return this.filter === ''
      // Return the entire list
      ? this.products
      // Otherwise return the filtered list of products where the category equals this filter property
      : this.products.filter((product)=> product.category === this.filter)
  }
}
