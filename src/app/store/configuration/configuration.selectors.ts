import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigurationState } from './configuration.models';
import { configurationFeatureKey } from './configuration.reducer';

export const selectConfiguration = createFeatureSelector<ConfigurationState>(configurationFeatureKey);
export const selectCurrent = createSelector(selectConfiguration, (s) => s.current);
export const selectCurrentSku = createSelector(selectCurrent, (c) => c?.skuId ?? null);
export const selectCurrentForm = createSelector(selectCurrent, (c) => c?.form ?? {});
