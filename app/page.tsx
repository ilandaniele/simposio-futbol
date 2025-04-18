"use client"

import type React from "react"
import Link from "next/link"

import { useState, useEffect, useRef } from "react"
import Modal from "./modal"
import Header from "./components/header"
import Footer from "./components/footer"
import HeroCarousel from "./components/heroCarousel"
import Image from "next/image"
import "./globals.css"

interface DiaInfo {
  fecha: string
  hora: string
}

interface Expositor {
  nombre: string
  titulo: string
  descripcion: string
  imagen: string
  imagenes?: string[] // Array de imágenes para el carrusel
}

interface Organizador {
  nombre: string
  titulo: string
  descripcion: string
  imagen: string
}

const Home: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [activeDay, setActiveDay] = useState(1)
  const [slideDirection, setSlideDirection] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const totalDays = 3

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  const nextDay = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideDirection("slide-left")
    setTimeout(() => {
      const newDay = activeDay === totalDays ? 1 : activeDay + 1
      setActiveDay(newDay)
      setSlideDirection("slide-in-right")
      setTimeout(() => setIsAnimating(false), 500)
    }, 500)
  }

  const prevDay = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideDirection("slide-right")
    setTimeout(() => {
      const newDay = activeDay === 1 ? totalDays : activeDay - 1
      setActiveDay(newDay)
      setSlideDirection("slide-in-left")
      setTimeout(() => setIsAnimating(false), 500)
    }, 500)
  }

  const goToDay = (day: number) => {
    if (day === activeDay || isAnimating) return
    setIsAnimating(true)
    const direction = day > activeDay ? "slide-left" : "slide-right"
    setSlideDirection(direction)
    setTimeout(() => {
      setActiveDay(day)
      setSlideDirection(day > activeDay ? "slide-in-right" : "slide-in-left")
      setTimeout(() => setIsAnimating(false), 500)
    }, 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) nextDay()
    }, 15000)
    return () => clearInterval(interval)
  }, [activeDay, isAnimating])

  const expositoresPorDia: { [key: number]: Expositor[] } = {
    1: [
      {
        nombre: "Gabriel Añón",
        titulo: "Introducción al Modelo de Juego",
        descripcion: "Entrenador de fútbol Uruguayo Licencia Pro y docente especializado en técnica y táctica.",
        imagen: "/images/gabriel-anon-cut.jpg",
        imagenes: ["/images/gabriel-anon-cut.jpg", "/images/gabriel-anon-2.jpg"],
      },
      {
        nombre: "Iván Stirk",
        titulo: "Influencia de la Gestión Deportiva en la Consolidación del Modelo de Juego",
        descripcion:
          "Director deportivo Aucas, Gestión deportiva Atlético de San Luis, Santos Laguna, Mineros de Zacatecas, además formo parte del Cuerpo técnico selección de Nicaragua.",
        imagen: "/images/ivan-stirk.jpg",
      },
    ],
    2: [
      {
        nombre: "Enrique Cesana",
        titulo: "Entrenamiento y Cultura Futbolística Sudamericana: Un Método con Identidad",
        descripcion: "Preparador Físico - Entrenador selecciones juveniles Argentina. Director y creador de GRUPOEKPO.",
        imagen: "/images/enrique-cesana.png",
        imagenes: ["/images/enrique-cesana.png", "/images/enrique-cesana-2.jpg"],
      },
      {
        nombre: "Miguel Torres",
        titulo: "Entrenamiento del Portero Adaptado al Modelo de Juego",
        descripcion: "Entrenador de Arqueros fútbol formativo Universidad de Chile. Licencia Pro ANFP Chile.",
        imagen: "/images/miguel-torres-cut.jpg",
        imagenes: ["/images/miguel-torres-cut.jpg"],
      },
      {
        nombre: "Alejandro Garay",
        titulo: "Modelo de Juego en Selecciones Nacionales Juveniles",
        descripcion:
          "Entrenador selecciones juveniles Uruguay, Coordinador divisiones inferiores Montevideo Wanderers, Instructor Conmebol.",
        imagen: "/images/alejandro-garay-cut.jpg",
        imagenes: ["/images/alejandro-garay-cut.jpg"],
      },
    ],
    3: [
      {
        nombre: "Gerardo Pelusso",
        titulo: "Construcción de un Modelo de Juego: Un Camino de Aprendizaje y Experiencia",
        descripcion:
          "Entrenador multicampeón de Sudamérica, dirigió equipos como Nacional de Uruguay, Olimpia de Paraguay, Universidad de Chile, Independiente de Santa Fe, entre otros. Además de la Selección de Paraguay. Actualmente forma parte del GET de Conmebol.",
        imagen: "/images/gerardo-pelusso-1.jpg",
        imagenes: ["/images/gerardo-pelusso-1.jpg", "/images/gerardo-pelusso-2.jpg"],
      },
    ],
  }

  const organizadores: Organizador[] = [
    {
      nombre: "Aaron Duran",
      titulo: "Organizador y Moderador",
      descripcion: "Entrenador de Fútbol Licencia Pro AUDEF. Kinesiólogo de alto rendimiento.",
      imagen: "/images/aaron-duran-5.jpeg",
    },
    {
      nombre: "Pablo Hernández Roetti",
      titulo: "Director del ITP",
      descripcion: "Director del Instituto Técnico Profesional de la Asociación Uruguaya de Entrenadores de Fútbol.",
      imagen: "/images/director.jpg",
    },
  ]

  const diasInfo: { [key: number]: DiaInfo } = {
    1: {
      fecha: "1 de Mayo 2025",
      hora: "A partir de las 19:00 hrs Uruguay",
    },
    2: {
      fecha: "2 de Mayo 2025",
      hora: "A partir de las 18:00 hrs Uruguay",
    },
    3: {
      fecha: "3 de Mayo 2025",
      hora: "A partir de las 19:00 hrs Uruguay",
    },
  }

  return (
    <>
      <Header />
      <main>
        <HeroCarousel />

        

        <section id="inscripcion" className="registration-hero">
          <div className="registration-content">
            <h2>
              <span>Primer Simposio</span>
              <span className="highlight">Internacional</span>
            </h2>
            <p className="event-description">
              Un evento diseñado para entrenadores y profesionales del fútbol que buscan profundizar en el modelo de
              juego sudamericano y sus elementos fundamentales
            </p>
            <button onClick={toggleModal} className="cta-button">
              Inscríbete Aquí
            </button>
          </div>
        </section>

        <section id="expositores" className="exhibitors">
          <h3 className="section-title">Cronograma de Expositores</h3>

          <div className="day-tabs">
            {[1, 2, 3].map((day) => (
              <button
                key={day}
                className={activeDay === day ? "active" : ""}
                onClick={() => goToDay(day)}
                disabled={isAnimating}
              >
                Día {["I", "II", "III"][day - 1]}
              </button>
            ))}
          </div>

          <div className="day-info">
            <div className="day-date-elegant">
              <span className="day-date">{diasInfo[activeDay].fecha}</span>
              <span className="day-time">{diasInfo[activeDay].hora}</span>
            </div>
          </div>

          <div className="carousel-container">
            <button className="carousel-arrow prev" onClick={prevDay} aria-label="Día anterior" disabled={isAnimating}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div className="carousel-wrapper">
              <div ref={carouselRef} className={`carousel-content ${slideDirection}`}>
                {expositoresPorDia[activeDay].map((expositor, index) => {
                  // Crear un ID para el expositor basado en su nombre
                  const expositorId = expositor.nombre
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")

                  return (
                    <Link href={`/expositor/${expositorId}`} key={index} className="exhibitor-link">
                      <div className="exhibitor">
                        <img
                          src={expositor.imagen || "/placeholder.svg"}
                          alt={expositor.nombre}
                          width={300}
                          height={300}
                        />
                        <div className="exhibitor-content">
                          <h4>{expositor.nombre}</h4>
                          {expositor.titulo && <p className="exhibitor-title">{`"${expositor.titulo}"`}</p>}
                          {expositor.descripcion && <p className="exhibitor-description">{expositor.descripcion}</p>}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            <button className="carousel-arrow next" onClick={nextDay} aria-label="Día siguiente" disabled={isAnimating}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          <div className="carousel-indicators">
            {Array.from({ length: totalDays }).map((_, index) => (
              <button
                key={index}
                className={activeDay === index + 1 ? "active" : ""}
                onClick={() => goToDay(index + 1)}
                aria-label={`Ir al día ${index + 1}`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </section>

        <section className="certification">
          <h3>Certificación y Modalidades de Participación</h3>
          <div className="certification-content">
            <div className="certification-info">
              <h4 className="certification-subtitle">Certificado de Participación</h4>
              <p>
                Todos los participantes inscritos recibirán un certificado validado por el Instituto Técnico Profesional
                de la Asociación Uruguaya de Entrenadores de Fútbol, válido para incluir en tu CV profesional.
              </p>
              <h4 className="certification-subtitle">Modalidades de Participación</h4>
              <ul className="certification-list">
                <li>
                  <strong>Zoom:</strong> Cupos limitados (80 aproximadamente). Los participantes podrán interactuar
                  directamente con los expositores.
                </li>
                <li>
                  <strong>YouTube:</strong> Transmisión abierta a todo público. Para obtener el certificado es necesario
                  inscribirse a través del formulario.
                </li>
              </ul>
              <div className="deadline-info">
                <p>
                  <strong>Fecha límite de inscripción:</strong> 24 horas antes del inicio del simposio.
                </p>
              </div>
            </div>
            <div className="certification-image">
              <Image
                src="/images/certificado.jpg"
                alt="Certificado de Participación"
                width={400}
                height={300}
                className="certificate-img"
              />
            </div>
          </div>
        </section>

        <section id="organizadores" className="organizators">
          <h3 className="section-title">Organizadores</h3>
          <div className="carousel-container">
            <div className="carousel-wrapper">
              <div className="carousel-content">
                {organizadores.map((organizador, index) => {
                  // Crear un ID para el organizador basado en su nombre
                  const organizadorId = organizador.nombre
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")

                  return (
                    <Link href={`/expositor/${organizadorId}`} key={index} className="exhibitor-link">
                      <div className="exhibitor">
                        <img
                          src={organizador.imagen || "/placeholder.svg"}
                          alt={organizador.nombre}
                          width={300}
                          height={300}
                        />
                        <div className="exhibitor-content">
                          <h4>{organizador.nombre}</h4>
                          {organizador.titulo && <p className="exhibitor-title">{`"${organizador.titulo}"`}</p>}
                          {organizador.descripcion && (
                            <p className="exhibitor-description">{organizador.descripcion}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="sponsors">
          <h3>Auspicia</h3>
          <div className="sponsor-grid">
            <div className="sponsor-item">
              <Image src="/images/itp.png" alt="Insituto Terciario" className="sponsor-logo" width={150} height={80} />
            </div>
            <div className="sponsor-item">
              <Image
                src="/images/audef.png"
                alt="Asociación Uruguaya de Entrenadores de Fútbol"
                className="sponsor-logo"
                width={150}
                height={80}
              />
            </div>
            <div className="sponsor-item">
              <a href="https://www.ascendigitalmarketing.com" target="_blank" rel="noopener noreferrer">
                <Image src="/ascend.png" alt="Ascend" className="sponsor-logo" width={150} height={80} />
              </a>
            </div>
          </div>
        </section>

        <section className="social-media">
          <h3>Conéctate con nosotros</h3>
          <p>
            ¿Tienes alguna pregunta o comentario sobre el Primer Simposio Internacional de Fútbol? Estamos aquí para
            ayudarte.
          </p>
          <div className="social-buttons-container">
            <div className="social-buttons">
              <a
                href="https://instagram.com/simposio_futbol"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="mailto:simposiofutbol@gmail.com" className="social-button" aria-label="Enviar correo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
      {isModalOpen && <Modal onClose={toggleModal} />}
    </>
  )
}

export default Home
