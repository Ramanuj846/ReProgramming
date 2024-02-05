// product.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs'; // Import Observable and of
import { Action } from '@ngrx/store'; // Import Action
import { ProductService } from './product.service';
import * as ProductActions from './product.action';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() => this.productService.getProducts()),
      map(products => ProductActions.loadProductsSuccess({ products }))
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap(action => this.productService.addProduct(action.product))
    ),
    { dispatch: false }
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap((action) =>
        // Make sure to replace 'unknown' with the expected type for updateProduct
        this.productService.updateProduct(action.productId, action.productData)
          .pipe(
            // Map the result to your action or a new action
            map(result => ProductActions.updateProductSuccess({ updatedProduct: result })),
            // Catch any errors and map to an action if needed
            // catchError(error => of(ProductActions.updateProductFailure({ error })))
          )
      ),
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(action => this.productService.deleteProduct(action.productId))
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private productService: ProductService) {}
}
