export interface CheckoutFormData {
  name: string;
  paymentMethod: string;
  deliveryMethod: string;
  address: {
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    number: string;
    complement: string;
  };
}
