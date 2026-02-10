import { createReducer } from '@ngrx/store';
import { initialCatalogState } from './catalog.models';

export const catalogFeatureKey = 'catalog';

export const catalogReducer = createReducer(initialCatalogState);
