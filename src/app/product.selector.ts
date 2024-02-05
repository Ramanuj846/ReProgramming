// product.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getProductState = createFeatureSelector<any[]>('products');

export const getProducts = createSelector(getProductState, (state) => state);
