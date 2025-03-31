"use client"

import type React from "react"

import { useState } from "react"
import Modal from "./modal"
import "./globals.css"

const Home: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  return (
    <main>
      <header className="main-header">
        <h1>Simposio de Fútbol</h1>
        <h2>Academia de Preparación Física en Fútbol</h2>
      </header>

      <section className="intro">
        <h3>Los preparadores físicos que llegan a vivir del fútbol …¿Qué hacen diferente al resto?</h3>
        <p>Aprende técnicas, diseña tareas, planifica temporadas.</p>
        <p>
          Dentro de la Academia de Preparadores Físicos te enseñaré todo lo que necesitas para diseñar, planificar y
          estructurar la preparación física de tu equipo.
        </p>
      </section>

      {/* CTA Section - Moved up as requested */}
      <section className="registration-hero">
        <div className="registration-content">
          <h2>
            <span>Primer Simposio</span>
            <span className="highlight">Internacional</span>
          </h2>
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

      <section className="exhibitors">
        <h3>Expositores</h3>
        <div className="exhibitor-list">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="exhibitor" key={index}>
              <img
                src={`/placeholder.svg?height=300&width=400&text=Expositor+${index + 1}`}
                alt={`Expositor ${index + 1}`}
              />
              <h4>Expositor {index + 1}</h4>
              <p>Descripción del expositor {index + 1}. Especialista en preparación física para fútbol.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sponsors">
        <h3>Auspiciantes</h3>
        <div className="sponsor-list">
          <div className="sponsor-item">
            <img src="/logo.png" alt="Ascend" className="sponsor-logo" />
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
          videos y herramientas para que sepas cómo debes dar tus primeros pasos en el mundo de la Preparación Física en
          Fútbol.
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

      <footer className="main-footer">
        <p>© {new Date().getFullYear()} Simposio de Fútbol. Todos los derechos reservados.</p>
      </footer>

      {isModalOpen && <Modal onClose={toggleModal} />}
    </main>
  )
}

export default Home

