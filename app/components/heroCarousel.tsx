"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function HeroCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  // Images of world champions
  const championImages = [
    "/images/campeones del mundo/1.jpg",
    "/images/campeones del mundo/2.jpg",
    "/images/campeones del mundo/3.jpg",
    "/images/campeones del mundo/4.jpg",
    "/images/campeones del mundo/5.jpg",
    "/images/campeones del mundo/6.jpg",
    "/images/campeones del mundo/7.png",
    "/images/campeones del mundo/8.jpg",
    "/images/campeones del mundo/9.jpg",
    "/images/campeones del mundo/10.jpg",
    "/images/campeones del mundo/11.jpg",
    "/images/campeones del mundo/12.jpg",
    "/images/campeones del mundo/13.jpg",
    "/images/campeones del mundo/14.jpg",
    "/images/campeones del mundo/15.jpg",
    "/images/campeones del mundo/16.jpg",
    "/images/campeones del mundo/17.jpg",
    "/images/campeones del mundo/18.jpg",
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
    <section id="inicio" className="world-champions-carousel">
      {/* Content overlay with white box */}
      <div className="hero-content-overlay">
        <div className="hero-logo-circle">
          <Image src="/logo.png" alt="Logo Simposio" width={200} height={200} className="hero-logo" />
        </div>
        <div className="hero-subtitle-small">PRIMER SIMPOSIO INTERNACIONAL DE FÚTBOL</div>
        <h1 className="hero-title">
          Modelo de Juego
          <br />
          Sudamericano
        </h1>
        <h2 className="hero-subtitle-large">y sus Elementos</h2>

        <div className="hero-separator"></div>

        {/* White content box */}
        <div className="hero-content-box">
          <div className="hero-quote">"El modelo de juego es la esencia del entrenador."</div>
          <div className="yellow-line"></div>

          <div className="hero-intro-text">
            <p>
              Este simposio está pensado para quienes buscan transformar sus ideas en un modelo claro, coherente y
              aplicable.
            </p>
            <p>
              Invitamos a todos los entrenadores sudamericanos a ser parte de este espacio de reflexión, construcción e
              intercambio.
            </p>

            <div className="hero-blue-text">
              Una oportunidad única para seguir construyendo el futuro del fútbol sudamericano.
            </div>
          </div>
        </div>
      </div>

      {/* Background carousel */}
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <div className={`carousel-content ${slideDirection}`}>
            <div className="champion-image-container">
              <img
                src={championImages[currentImageIndex] || "/placeholder.svg"}
                alt="Campeones del Mundo"
                className="champion-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
