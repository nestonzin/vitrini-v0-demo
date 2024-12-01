'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { CartItem } from '@/app/hooks/useCart'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  onCheckout: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (id: number, change: number) => void
}

export function CartSidebar({ isOpen, onClose, onCheckout, cartItems, onUpdateQuantity }: CartSidebarProps) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho de Compras</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {cartItems.map(item => (
            <CartItemComponent key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} />
          ))}
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="font-bold">R$ {total.toFixed(2)}</span>
          </div>
          {cartItems.length === 0 && (
            <p className="text-center text-muted-foreground">
              Seu carrinho está vazio. Adicione itens para finalizar a compra.
            </p>
          )}
          <Button className="w-full" onClick={onCheckout} disabled={cartItems.length === 0}>
            Finalizar Compra
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface CartItemComponentProps {
  item: CartItem
  onUpdateQuantity: (id: number, change: number) => void
}

function CartItemComponent({ item, onUpdateQuantity }: CartItemComponentProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p>R$ {item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => onUpdateQuantity(item.id, -1)}
          aria-label="Diminuir quantidade"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span>{item.quantity}</span>
        <Button
          size="icon"
          variant="outline"
          onClick={() => onUpdateQuantity(item.id, 1)}
          aria-label="Aumentar quantidade"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

