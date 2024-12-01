'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const slides = [
  {
    image: '/slide1.jpg',
    alt: 'Promoção de Verão',
    title: 'Promoção de Verão',
    description: 'Aproveite descontos de até 50% em produtos selecionados',
  },
  {
    image: '/slide2.jpg',
    alt: 'Novos Produtos',
    title: 'Novos Produtos',
    description: 'Confira as últimas novidades da nossa loja',
  },
  {
    image: '/slide3.jpg',
    alt: 'Frete Grátis',
    title: 'Frete Grátis',
    description: 'Em compras acima de R$ 200,00 para todo o Brasil',
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[500px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* <Image
            src={slide.image}
            alt={slide.alt}
            layout="fill"
            objectFit="cover"
            priority={index === 0}
          /> */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
            <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
            <p className="text-xl">{slide.description}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir para o slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

