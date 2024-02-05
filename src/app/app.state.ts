// app.state.ts
import { productReducer } from './product.reducer';

export interface AppState {
  products: any[]; // Add other state slices if needed
}

export const reducers = {
  products: productReducer,
};
