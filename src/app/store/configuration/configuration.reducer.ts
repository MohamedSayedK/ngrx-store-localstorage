import { createReducer, on } from '@ngrx/store';
import { initialConfigurationState, ConfigurationState } from './configuration.models';
import { resetForm, setCurrentSku, updateForm } from './configuration.actions';

export const configurationFeatureKey = 'configuration';

export const configurationReducer = createReducer(
  initialConfigurationState,
  on(setCurrentSku, (state, { skuId }): ConfigurationState => {
    if (state.current?.skuId === skuId) return state;
    return { ...state, current: { skuId, form: {} } };
  }),
  on(updateForm, (state, { changes }): ConfigurationState => {
    if (!state.current) return state;
    return {
      ...state,
      current: { skuId: state.current.skuId, form: { ...state.current.form, ...changes } },
    };
  }),
  on(resetForm, (state): ConfigurationState => {
    if (!state.current) return state;
    return { ...state, current: { skuId: state.current.skuId, form: {} } };
  })
);
