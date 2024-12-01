"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import { CartItem } from "@/app/hooks/useCart";
import { CheckoutFormData } from "@/types/CheckoutFormData";
import { FormErrors } from "@/types/FormErrors";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinalize: (formData: CheckoutFormData) => void;
  cartItems: CartItem[];
}

export function CheckoutModal({
  isOpen,
  onClose,
  onFinalize,
  cartItems,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    paymentMethod: "",
    deliveryMethod: "",
    address: {
      cep: "",
      street: "",
      neighborhood: "",
      city: "",
      state: "",
      number: "",
      complement: "",
    },
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = (): boolean => {
    return (
      formData.name !== "" &&
      formData.paymentMethod !== "" &&
      formData.deliveryMethod !== "" &&
      (formData.deliveryMethod !== "entrega" ||
        (formData.address.cep !== "" &&
          formData.address.street !== "" &&
          formData.address.neighborhood !== "" &&
          formData.address.city !== "" &&
          formData.address.state !== "" &&
          formData.address.number !== ""))
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      if (/[^a-zA-Z\s]/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          name: "O nome não pode conter números ou caracteres especiais",
        }));
      } else {
        setErrors((prev) => ({ ...prev, name: "" }));
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
    setErrors((prev) => ({ ...prev, paymentMethod: "" }));
  };

  const handleDeliveryMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, deliveryMethod: value }));
    setErrors((prev) => ({ ...prev, deliveryMethod: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onFinalize(formData);
    }
  };

  const fetchAddressData = async (cep: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/cep?cep=${cep}`);
      const data = await response.json();
      if (response.ok) {
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            ...data,
            cep,
          },
        }));
        setErrors((prev) => ({ ...prev, address: {} }));
      } else {
        setErrors((prev) => ({
          ...prev,
          address: { ...prev.address, cep: data.error },
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      setErrors((prev) => ({
        ...prev,
        address: { ...prev.address, cep: "Erro ao buscar o CEP" },
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCepBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      fetchAddressData(cep);
    } else {
      setErrors((prev) => ({
        ...prev,
        address: { ...prev.address, cep: "CEP inválido" },
      }));
    }
  };

  const totalValue = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] w-full overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Finalizar Compra</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-2 sm:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm sm:text-base">
                Nome do Cliente
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 h-10 sm:h-12"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <Label className="text-sm sm:text-base">Forma de Pagamento</Label>
              <RadioGroup
                name="paymentMethod"
                value={formData.paymentMethod}
                onValueChange={handlePaymentMethodChange}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix">Pix</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dinheiro" id="dinheiro" />
                  <Label htmlFor="dinheiro">Dinheiro</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cartao" id="cartao" />
                  <Label htmlFor="cartao">Cartão</Label>
                </div>
              </RadioGroup>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
              )}
            </div>
            <div>
              <Label className="text-sm sm:text-base">Forma de Retirada</Label>
              <Select
                name="deliveryMethod"
                value={formData.deliveryMethod}
                onValueChange={handleDeliveryMethodChange}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma de retirada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retirada">Retirada na loja</SelectItem>
                  <SelectItem value="entrega">Entrega via motoboy</SelectItem>
                </SelectContent>
              </Select>
              {errors.deliveryMethod && (
                <p className="text-red-500 text-sm">{errors.deliveryMethod}</p>
              )}
            </div>
            {formData.deliveryMethod === "entrega" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cep" className="text-sm sm:text-base">
                    CEP
                  </Label>
                  <div className="relative">
                    <Input
                      id="cep"
                      name="cep"
                      value={formData.address.cep}
                      onChange={handleAddressChange}
                      onBlur={handleCepBlur}
                      required
                      className="mt-1 h-10 sm:h-12"
                    />
                    {isLoading && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <Loader className="animate-spin h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                  {errors.address?.cep && (
                    <p className="text-red-500 text-sm">{errors.address.cep}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="street" className="text-sm sm:text-base">
                    Rua
                  </Label>
                  <Input
                    id="street"
                    name="street"
                    value={formData.address.street}
                    onChange={handleAddressChange}
                    required
                    className="mt-1 h-10 sm:h-12"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="neighborhood"
                    className="text-sm sm:text-base"
                  >
                    Bairro
                  </Label>
                  <Input
                    id="neighborhood"
                    name="neighborhood"
                    value={formData.address.neighborhood}
                    onChange={handleAddressChange}
                    required
                    className="mt-1 h-10 sm:h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-sm sm:text-base">
                    Cidade
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                    required
                    className="mt-1 h-10 sm:h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-sm sm:text-base">
                    Estado
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.address.state}
                    onChange={handleAddressChange}
                    required
                    className="mt-1 h-10 sm:h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="number" className="text-sm sm:text-base">
                    Número
                  </Label>
                  <Input
                    id="number"
                    name="number"
                    value={formData.address.number}
                    onChange={handleAddressChange}
                    required
                    className="mt-1 h-10 sm:h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="complement" className="text-sm sm:text-base">
                    Complemento
                  </Label>
                  <Input
                    id="complement"
                    name="complement"
                    value={formData.address.complement}
                    onChange={handleAddressChange}
                    className="mt-1 h-10 sm:h-12"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2 mt-6">
            <h3 className="font-semibold text-lg">Resumo do Pedido</h3>
            <div className="max-h-40 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span>
              <span>R$ {totalValue.toFixed(2)}</span>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-4 h-12"
            disabled={!isFormValid()}
          >
            Finalizar Pedido
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
