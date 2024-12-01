import Link from 'next/link'
import { Facebook, Instagram, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background text-foreground p-8">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div itemScope itemType="http://schema.org/LocalBusiness">
          <h2 itemProp="name" className="text-lg font-bold">Minha Loja</h2>
          <address itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
            <p itemProp="streetAddress">Rua Exemplo, 123</p>
            <p>
              <span itemProp="addressLocality">Cidade</span>,{' '}
              <span itemProp="addressRegion">Estado</span> -{' '}
              <span itemProp="postalCode">12345-678</span>
            </p>
          </address>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="https://instagram.com/minhaloja" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="https://facebook.com/minhaloja" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
            <Phone className="h-6 w-6" />
            <span className="sr-only">WhatsApp</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

