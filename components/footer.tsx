"use client";

import Link from "next/link";
import { Facebook, Instagram, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
  const [mounted, setMounted] = useState(false);
  const [storeData, setStoreData] = useState({
    name: "",
    address: "",
    phone: "",
    instagram: "",
    facebook: "",
  });

  useEffect(() => {
    const getStoreData = async () => {
      try {
        const response = await fetch("/api/stores");
        const data = await response.json();
        setStoreData(data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    getStoreData();
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <footer className="bg-background text-foreground p-8">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div itemScope itemType="http://schema.org/LocalBusiness">
          <h2 itemProp="name" className="text-lg font-bold">
            {storeData.name}
          </h2>
          <address
            itemProp="address"
            itemScope
            itemType="http://schema.org/PostalAddress"
          >
            <p itemProp="streetAddress">{storeData.address}</p>
          </address>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link
            href={storeData.instagram || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href={storeData.facebook || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href={`https://wa.me/${storeData.phone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone className="h-6 w-6" />
            <span className="sr-only">WhatsApp</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
