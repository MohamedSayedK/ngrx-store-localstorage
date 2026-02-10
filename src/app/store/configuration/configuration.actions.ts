import { createAction, props } from '@ngrx/store';
import { ContactForm } from './configuration.models';

export const setCurrentSku = createAction(
  '[Configuration] Set Current Sku',
  props<{ skuId: string }>()
);

export const updateForm = createAction(
  '[Configuration] Update Form',
  props<{ changes: Partial<ContactForm> }>()
);

export const resetForm = createAction('[Configuration] Reset Form');
