import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../catalog/product.model';

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  // The @Input() decorator tells the child component, and any component that uses the child component, that it does have a product member that can receive data from a parent
  // The ! tells TS to ignore that it's not initialized and assume it always has a value
  @Input() product!: IProduct;

  @Output() buy = new EventEmitter();

  // This method is passed to catalog HTML to return the image
  getImageUrl(product: IProduct){
    return '/assets/images/robot-parts/' + product.imageName;
  }

  buyButtonClicked(){
    // The emit() method is how we trigger the event
    this.buy.emit();
  }
}
