// product.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.action';

export const initialState: any[] = [];

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { products }) => [...products]),
  on(ProductActions.addProduct, (state, { product }) => [...state, { ...product, id: (state.length + 1).toString() }]),
  on(ProductActions.updateProduct, (state, { product }) => state.map(p => (p.id === product.id ? { ...product } : p))),
  on(ProductActions.deleteProduct, (state, { productId }) => state.filter(p => p.id !== productId))
);
