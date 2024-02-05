import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductActions from './product.action';
import { getProducts } from './product.selector';
import { MatDialog } from '@angular/material/dialog';
import { AddproductComponent } from './addproduct/addproduct.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products$ = this.store.select(getProducts);

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit() {
    this.store.dispatch(ProductActions.loadProducts());
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddproductComponent, {
      width: '400px',
      data: {} // Pass any initial data if needed
    });

    dialogRef.afterClosed().subscribe((newProduct) => {
      if (newProduct) {
        this.store.dispatch(ProductActions.addProduct({ product: newProduct }));
      }
    });
  }

  editProduct(product: any) {
    // Open the dialog and pass the product data
    const dialogRef = this.dialog.open(AddproductComponent, {
      width: '400px',
      data: { product },
    });
  
    // Subscribe to the dialog's afterClosed event to handle the result
    dialogRef.afterClosed().subscribe((editedProduct) => {
      console.log('Edited Product:', editedProduct);
    
      if (editedProduct && editedProduct.id) {
        // Update the product in the store or perform any necessary action
        this.store.dispatch(ProductActions.updateProduct({ product: editedProduct }));
      }
    });
  }
  

  deleteProduct(product: any) {
    console.log('Product to delete:', product);
    if (product && product.id) {
      const productId = product.id;
      this.store.dispatch(ProductActions.deleteProduct({ productId }));
    }
  }
}
