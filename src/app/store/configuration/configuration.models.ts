export interface ContactForm {
  fullName: string;
  email: string;
  phone: string;
  quantity: number;
  notes: string;
}

export interface ConfigurationState {
  current: { skuId: string; form: Partial<ContactForm> } | null;
}

export const initialConfigurationState: ConfigurationState = {
  current: null,
};
