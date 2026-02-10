import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatalogState, Product } from './catalog.models';
import { catalogFeatureKey } from './catalog.reducer';

export const selectCatalog = createFeatureSelector<CatalogState>(catalogFeatureKey);
export const selectProducts = createSelector(selectCatalog, (s) => s.products);
export const selectProductBySku = (skuId: string) =>
  createSelector(selectProducts, (products): Product | null => {
    return products.find((p) => p.skuId === skuId) ?? null;
  });
