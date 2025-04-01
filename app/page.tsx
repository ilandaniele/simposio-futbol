"use client"

import type React from "react"

import { useState } from "react"
import Modal from "./modal"
import Header from "./components/header"
import Footer from "./components/footer"
import "./globals.css"

const Home: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [activeDay, setActiveDay] = useState(1)

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  // Datos de los expositores organizados por día
  const expositoresPorDia = {
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
        imagen: "/placeholder.svg?height=300&width=300&text=Gabriel+Añón",
      },
      {
        nombre: "Gaston Mendoza",
        titulo: "Planificación y Entrenamiento Adaptado al Modelo de Juego",
        descripcion:
          "Preparador físico con amplia experiencia en clubes como Olimpia, Pachuca, Unión Española, Arsenal, Godoy Cruz, Libertad, Querétaro. Participó en los Juegos Olímpicos de Atenas 2004 con la selección paraguaya.",
        imagen: "/placeholder.svg?height=300&width=300&text=Gaston+Mendoza",
      },
    ],
    2: [
      {
        nombre: "Enrique Cesana",
        titulo: "Entrenamiento y Cultura Futbolística Sudamericana: Un Método con Identidad",
        descripcion: "Preparador Físico - Entrenador selecciones juveniles Argentina. Director y creador de GRUPOEKPO.",
        imagen: "/placeholder.svg?height=300&width=300&text=Enrique+Cesana",
      },
      {
        nombre: "Miguel Torres",
        titulo: "Entrenamiento del Portero Adaptado al Modelo de Juego",
        descripcion: "Entrenador de Arqueros fútbol formativo Universidad de Chile. Licencia Pro ANFP Chile.",
        imagen: "/placeholder.svg?height=300&width=300&text=Miguel+Torres",
      },
      {
        nombre: "Alejandro Garay",
        titulo: "Modelo de Juego en Selecciones Nacionales Juveniles",
        descripcion:
          "Entrenador selecciones juveniles Uruguay, Coordinador divisiones inferiores Montevideo Wanderers, Instructor Conmebol.",
        imagen: "/placeholder.svg?height=300&width=300&text=Alejandro+Garay",
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
        imagen: "/placeholder.svg?height=300&width=300&text=Gerardo+Pelusso",
      },
    ],
  }

  // Información de los días
  const diasInfo = {
    1: {
      fecha: "1 de Mayo 2025",
      hora: "A partir de las 19:00 hrs Uruguay",
    },
    2: {
      fecha: "2 de Mayo 2025",
      hora: "A partir de las 16:00 hrs Uruguay",
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
          <h3>Los preparadores físicos que llegan a vivir del fútbol …¿Qué hacen diferente al resto?</h3>
          <p>Aprende técnicas, diseña tareas, planifica temporadas.</p>
          <p>
            Dentro de la Academia de Preparadores Físicos te enseñaré todo lo que necesitas para diseñar, planificar y
            estructurar la preparación física de tu equipo.
          </p>
        </section>

        {/* CTA Section - Moved up as requested */}
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

        <section className="collaborations">
          <h3>En Fútbol entre Profes ya hemos colaborado en formaciones con:</h3>
          <div className="sponsor-grid">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odF1BkDgcYjOnUkLfnlSMsydBKk0b3.png"
              alt="Colaboradores"
              className="sponsor-logo"
            />
            <img src="/placeholder.svg?height=80&width=150" alt="Universidad de Granada" className="sponsor-logo" />
            <img src="/placeholder.svg?height=80&width=150" alt="Universidad Pontificia" className="sponsor-logo" />
            <img src="/placeholder.svg?height=80&width=150" alt="European College" className="sponsor-logo" />
            <img src="/placeholder.svg?height=80&width=150" alt="Club Deportivo" className="sponsor-logo" />
            <img src="/placeholder.svg?height=80&width=150" alt="Universidad Andrés Bello" className="sponsor-logo" />
          </div>
        </section>

        <section id="expositores" className="exhibitors">
          <h3>Cronograma de Expositores</h3>

          <div className="day-tabs">
            <button className={activeDay === 1 ? "active" : ""} onClick={() => setActiveDay(1)}>
              Día I
            </button>
            <button className={activeDay === 2 ? "active" : ""} onClick={() => setActiveDay(2)}>
              Día II
            </button>
            <button className={activeDay === 3 ? "active" : ""} onClick={() => setActiveDay(3)}>
              Día III
            </button>
          </div>

          <div className="day-info">
            <p className="day-date">
              {diasInfo[activeDay].fecha} - {diasInfo[activeDay].hora}
            </p>
          </div>

          <div className="exhibitor-list">
            {expositoresPorDia[activeDay].map((expositor, index) => (
              <div className="exhibitor" key={index}>
                <img src={expositor.imagen || "/placeholder.svg"} alt={expositor.nombre} />
                <div className="exhibitor-content">
                  <h4>{expositor.nombre}</h4>
                  {expositor.titulo && <p className="exhibitor-title">"{expositor.titulo}"</p>}
                  {expositor.descripcion && <p className="exhibitor-description">{expositor.descripcion}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sponsors">
          <h3>Auspiciantes</h3>
          <div className="sponsor-list">
            <div className="sponsor-item">
              <img src="/logo.png" alt="Ascend" className="sponsor-logo" />
              <p>Ascend</p>
            </div>
            <div className="sponsor-item">
              <img src="/placeholder.svg?height=80&width=150" alt="Auspiciante 2" className="sponsor-logo" />
              <p>Auspiciante 2</p>
            </div>
            <div className="sponsor-item">
              <img src="/placeholder.svg?height=80&width=150" alt="Auspiciante 3" className="sponsor-logo" />
              <p>Auspiciante 3</p>
            </div>
            <div className="sponsor-item">
              <img src="/placeholder.svg?height=80&width=150" alt="Auspiciante 4" className="sponsor-logo" />
              <p>Auspiciante 4</p>
            </div>
          </div>
        </section>

        <section className="social-media">
          <h3>Aprende algo nuevo cada día</h3>
          <p>
            ¿Quieres saber más sobre el mundo de la Preparación Física? En nuestros canales compartimos estrategias,
            videos y herramientas para que sepas cómo debes dar tus primeros pasos en el mundo de la Preparación Física
            en Fútbol.
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
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
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
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

