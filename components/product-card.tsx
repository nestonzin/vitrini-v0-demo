import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <article className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidde">
      <Image
        src={product.image}
        alt={product.name}
        width={150}
        height={150}
        className="w-[250px] h-[250px] object-cover mx-auto"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-sm mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">
            {mounted &&
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
          </span>
          <Button onClick={() => onAddToCart(product)}>Comprar</Button>
        </div>
      </div>
    </article>
  );
}
