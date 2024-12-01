"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/Product";
import { Skeleton } from "./ui/skeleton";

const ITEMS_PER_PAGE = 10;

export function ProductList({
  onAddToCart,
}: {
  onAddToCart: (product: Product) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const categories = [
    "todos",
    ...Array.from(
      new Set(products.map((product: Product) => product.category))
    ),
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/products?page=${currentPage}&limit=${ITEMS_PER_PAGE}&category=${selectedCategory}`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, [currentPage, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Nossos Produtos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
            <div key={index} className="rounded-lg border p-4">
              <Skeleton className="h-48 w-full rounded-lg" /> {/* Image */}
              <Skeleton className="h-4 w-2/3 mt-4" /> {/* Title */}
              <Skeleton className="h-4 w-1/3 mt-2" /> {/* Price */}
              <Skeleton className="h-10 w-full mt-4" /> {/* Button */}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Nossos Produtos</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => handleCategoryChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <nav
          className="mt-8 flex flex-col items-center space-y-4"
          aria-label="Navegação de páginas"
        >
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={previousPage}
              disabled={currentPage === 1}
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              aria-label="Próxima página"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      )}
    </section>
  );
}
