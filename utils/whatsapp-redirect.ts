import { CartItem } from "@/app/hooks/useCart";
import { CheckoutFormData } from "@/types/CheckoutFormData";

interface OrderData extends CheckoutFormData {
  items: CartItem[];
  total: string;
}

export function redirectToWhatsApp(orderData: OrderData) {
  const { name, paymentMethod, deliveryMethod, address, items, total } =
    orderData;
  const phoneNumber = "5521990007237";
  const itemsList = items
    .map(
      (item) =>
        `${item.name} (${item.quantity}x) - R$ ${(
          item.price * item.quantity
        ).toFixed(2)}`
    )
    .join("\n");

  let message = `Oi, gostaria de fazer o pedido:\n\n`;
  message += `\nNúmero do pedido: ${Math.floor(Math.random() * 1000000)} `;
  message += `Itens:\n${itemsList}\n`;
  message += `Valor total: R$ ${total}\n`;
  message += `Pagando via: ${paymentMethod}\n`;
  message += `${
    deliveryMethod === "retirada" ? "Retirando na loja" : "Entrega via motoboy"
  }\n`;

  if (deliveryMethod === "entrega") {
    message += `Endereço de entrega: ${address.street}, ${address.number}, ${address.neighborhood}, ${address.cep}\n`;
    if (address.complement) {
      message += `Complemento: ${address.complement}\n`;
    }
  }

  message += `\nNome do cliente: ${name}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}
