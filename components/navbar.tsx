"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface NavbarProps {
  cartItemsCount: number;
  onOpenCart: () => void;
}

export function Navbar({ cartItemsCount, onOpenCart }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [storeName, setStoreName] = useState<string>("");
  const [storeLogo, setStoreLogo] = useState<string>("");

  useEffect(() => {
    const getStoreData = async () => {
      try {
        const response = await fetch("/api/stores");
        const storeData = await response.json();
        console.log("Store Data:", storeData);
        setStoreName(storeData.name);
        setStoreLogo(storeData.logo);
      } catch (error) {
        console.error("Error fetching store:", error);
      }
    };

    getStoreData();
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-background">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src={storeLogo}
          alt={storeName}
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <div className="text-lg font-bold">{storeName}</div>
      </Link>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Alternar tema"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="outline"
          className="flex items-center space-x-2"
          onClick={onOpenCart}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItemsCount > 0 && <span>{cartItemsCount}</span>}
        </Button>
      </div>
    </nav>
  );
}
