export interface FormErrors {
  name?: string;
  paymentMethod?: string;
  deliveryMethod?: string;
  address?: {
    cep?: string;
  };
}
