"use client"

import type React from "react"
import Link from "next/link"

import { useState, useEffect, useRef } from "react"
import Modal from "./modal"
import Header from "./components/header"
import Footer from "./components/footer"
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
        nombre: "Aaron Duran",
        titulo: "Organizador y Moderador",
        descripcion: "Entrenador de Fútbol Licencia Pro AUDEF. Kinesiólogo de alto rendimiento.",
        imagen: "/placeholder.svg?height=300&width=300&text=Aaron+Duran",
      },
      {
        nombre: "Gabriel Añón",
        titulo: "Introducción al Modelo de Juego",
        descripcion: "Entrenador de fútbol Uruguayo Licencia Pro y docente especializado en técnica y táctica.",
        imagen: "/images/gabriel-anon.jpg",
      },
    ],
    2: [
      {
        nombre: "Enrique Cesana",
        titulo: "Entrenamiento y Cultura Futbolística Sudamericana: Un Método con Identidad",
        descripcion: "Preparador Físico - Entrenador selecciones juveniles Argentina. Director y creador de GRUPOEKPO.",
        imagen: "/images/enrique-cesana.png",
      },
      {
        nombre: "Miguel Torres",
        titulo: "Entrenamiento del Portero Adaptado al Modelo de Juego",
        descripcion: "Entrenador de Arqueros fútbol formativo Universidad de Chile. Licencia Pro ANFP Chile.",
        imagen: "/images/miguel-torres.jpg",
      },
      {
        nombre: "Alejandro Garay",
        titulo: "Modelo de Juego en Selecciones Nacionales Juveniles",
        descripcion:
          "Entrenador selecciones juveniles Uruguay, Coordinador divisiones inferiores Montevideo Wanderers, Instructor Conmebol.",
        imagen: "/images/alejandro-garay.jpg",
      },
    ],
    3: [
      {
        nombre: "Por confirmar",
        titulo: "",
        descripcion: "",
        imagen: "/placeholder.svg?height=300&width=300&text=Por+Confirmar",
      },
      {
        nombre: "Gerardo Pelusso",
        titulo: "Construcción de un Modelo de Juego: Un Camino de Aprendizaje y Experiencia",
        descripcion:
          "Entrenador multicampeón de Sudamérica, dirigió equipos como Nacional de Uruguay, Olimpia de Paraguay, Universidad de Chile, Independiente de Santa Fe, entre otros. Además de la Selección de Paraguay. Actualmente forma parte del GEF de Conmebol.",
        imagen: "/images/gerardo-pelusso-1.jpg",
      },
    ],
  }

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
        <section id="inicio" className="main-header">
          <h1>I Simposio Internacional de Fútbol</h1>
          <h2>Modelo de Juego Sudamericano y sus Elementos</h2>
        </section>

        <section className="intro">
          <h3>El fútbol sudamericano: pasión, creatividad y talento</h3>
          <p>
            El fútbol sudamericano siempre ha sido sinónimo de pasión, creatividad y talento. Sin embargo, en un mundo
            cada vez más competitivo, es fundamental evolucionar y consolidar un modelo de juego que combine nuestra
            identidad histórica con estrategias modernas.
          </p>
          <p>
            Este simposio surge de la necesidad de brindar a los entrenadores un camino claro para estructurar y aplicar
            sus ideas en el desarrollo del juego. Cuando un entrenador obtiene su titulación, posee una gran cantidad de
            conocimientos teóricos y conceptos en su mente, pero muchas veces enfrenta dificultades para traducirlos en
            una metodología práctica y coherente.
          </p>
          <p>
            Este simposio reúne a profesionales expertos en todas las áreas del fútbol, para compartir conocimientos y
            experiencias con el fin de fortalecer el desarrollo del modelo de juego propio de nuestra región
            sudamericana.
          </p>
        </section>

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

        <section className="certification">
          <h3>Certificación y Modalidades de Participación</h3>
          <div className="certification-content">
            <div className="certification-info">
              <h4>Certificado de Participación</h4>
              <p>
                Todos los participantes inscritos recibirán un certificado validado por el Instituto Técnico Profesional
                de la Asociación Uruguaya de Entrenadores de Fútbol, válido para incluir en tu CV profesional.
              </p>
              <h4>Modalidades de Participación</h4>
              <ul>
                <li>
                  <strong>Zoom:</strong> Cupos limitados (80 aproximadamente). Los participantes podrán interactuar
                  directamente con los expositores.
                </li>
                <li>
                  <strong>YouTube:</strong> Transmisión abierta a todo público. Para obtener el certificado es necesario
                  inscribirse a través del formulario.
                </li>
              </ul>
              <p className="deadline-info">
                <strong>Fecha límite de inscripción:</strong> 24 horas antes del inicio del simposio.
              </p>
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

        <section className="collaborations">
          <h3>Instituciones Colaboradoras</h3>
          <div className="sponsor-grid">
            <Image
              src="images/itp.png"
              alt="Colaboradores"
              className="sponsor-logo"
              width={150}
              height={80}
            />
            <Image
              src="/placeholder.svg?height=80&width=150"
              alt="Universidad de Granada"
              className="sponsor-logo"
              width={150}
              height={80}
            />
            <Image
              src="/placeholder.svg?height=80&width=150"
              alt="Universidad Pontificia"
              className="sponsor-logo"
              width={150}
              height={80}
            />
            <Image
              src="/placeholder.svg?height=80&width=150"
              alt="European College"
              className="sponsor-logo"
              width={150}
              height={80}
            />
            <Image
              src="/placeholder.svg?height=80&width=150"
              alt="Club Deportivo"
              className="sponsor-logo"
              width={150}
              height={80}
            />
            <Image
              src="/placeholder.svg?height=80&width=150"
              alt="Universidad Andrés Bello"
              className="sponsor-logo"
              width={150}
              height={80}
            />
          </div>
        </section>

        <section id="expositores" className="exhibitors">
          <h3 className="cronograma-titulo">Cronograma de Expositores</h3>

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
            <p className="day-date">
              {diasInfo[activeDay].fecha} - {diasInfo[activeDay].hora}
            </p>
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
              <div ref={carouselRef} className={`exhibitor-list ${slideDirection}`}>
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

        <section className="sponsors">
          <h3>Auspiciantes</h3>
          <div className="sponsor-list">
            <div className="sponsor-item">
              <Image src="/logo.png" alt="Ascend" className="sponsor-logo" width={150} height={80} />
              <p>Ascend</p>
            </div>
            {[2, 3, 4].map((n) => (
              <div className="sponsor-item" key={n}>
                <Image
                  src={`/placeholder.svg?height=80&width=150`}
                  alt={`Auspiciante ${n}`}
                  className="sponsor-logo"
                  width={150}
                  height={80}
                />
                <p>Auspiciante {n}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="social-media">
          <h3>Conéctate con nosotros</h3>
          <p>
            Síguenos en nuestras redes sociales para estar al tanto de las últimas novedades sobre el I Simposio
            Internacional de Fútbol: Modelo de Juego Sudamericano y sus Elementos.
          </p>
          <div className="social-icons">
            <a
              href="https://instagram.com/simposio_futbol"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon instagram"
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
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </section>

        <Footer />
      </main>
      {isModalOpen && <Modal onClose={toggleModal} />}
    </>
  )
}

export default Home

