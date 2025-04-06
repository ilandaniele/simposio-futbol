"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function heroCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  // Images of world champions
  const championImages = [
    "/images/campeones del mundo/1.png",
    "/images/campeones del mundo/2.png",
    "/images/campeones del mundo/3.png",
    "/images/campeones del mundo/4.png",
    "/images/campeones del mundo/5.png",
    "/images/campeones del mundo/6.png",
    "/images/campeones del mundo/7.png",
    "/images/campeones del mundo/8.png",
    "/images/campeones del mundo/9.png",
    "/images/campeones del mundo/10.png",
    "/images/campeones del mundo/11.png",
    "/images/campeones del mundo/12.png",
    "/images/campeones del mundo/13.png",
    "/images/campeones del mundo/14.png",
    "/images/campeones del mundo/15.png",
    "/images/campeones del mundo/16.png",
    "/images/campeones del mundo/17.png",
    "/images/campeones del mundo/18.png"
  ]

  // Auto-rotate images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextImage()
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [currentImageIndex, isAnimating])

  const nextImage = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideDirection("slide-left")

    setTimeout(() => {
      const nextIndex = (currentImageIndex + 1) % championImages.length
      setCurrentImageIndex(nextIndex)
      setSlideDirection("slide-in-right")
      setTimeout(() => setIsAnimating(false), 500)
    }, 500)
  }

  return (
    <section className="world-champions-carousel">
      {/* Título fijo superpuesto */}
      <div className="fixed-hero-content">
        <div className="hero-subtitle">- PRIMER SIMPOSIO INTERNACIONAL DE FÚTBOL -</div>
        <h1 className="hero-title">Modelo de Juego Sudamericano</h1>
        <h2 className="hero-subtitle-large">y sus Elementos</h2>
      </div>

      <div className="carousel-container">
        <div className="carousel-wrapper">
          <div className={`carousel-content ${slideDirection}`}>
            <div className="champion-image-container">
              <Image
                src={championImages[currentImageIndex] || "/placeholder.svg"}
                alt="Campeones del Mundo"
                width={1920}
                height={800}
                className="champion-image"
                priority
              />
              <div className="champion-overlay">
                <h3>Campeones del Mundo</h3>
                <p>Inspiración para el fútbol sudamericano</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

