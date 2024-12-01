"use client";

import { useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { ProductList } from "@/components/product-list";
import { CartSidebar } from "@/components/cart-sidebar";
import { CheckoutModal } from "@/components/checkout-modal";
import { redirectToWhatsApp } from "@/utils/whatsapp-redirect";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useCart, Product } from "./hooks/useCart";
import { CheckoutFormData } from "@/types/CheckoutFormData";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { cartItems, addToCart, updateQuantity, clearCart } = useCart();

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);
  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const handleCloseCheckout = () => setIsCheckoutOpen(false);

  const handleFinalize = (formData: CheckoutFormData) => {
    setIsCheckoutOpen(false);
    const orderData = {
      ...formData,
      items: cartItems,
      total: cartItems
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2),
    };
    redirectToWhatsApp(orderData);
    clearCart();
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <>
      <Navbar onOpenCart={handleOpenCart} cartItemsCount={cartItems.length} />
      <main>
        <HeroSection />
        <ProductList onAddToCart={handleAddToCart} />
      </main>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        onCheckout={handleOpenCheckout}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        onFinalize={handleFinalize}
        cartItems={cartItems}
      />
      <Footer />
    </>
  );
}
