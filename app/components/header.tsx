"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isExpositorPage = pathname.includes("/expositor/")

  // Detectar scroll para cambiar estilos del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    // Cerrar el menú móvil si está abierto
    setIsMobileMenuOpen(false)

    // Si estamos en la página de expositor, primero navegamos al inicio
    if (isExpositorPage) {
      window.location.href = `/#${id}`
      return
    }

    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className={`fixed-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo">
          <Link href="/">
            <Image src="/logo.png" alt="Simposio de Fútbol" width={50} height={50} />
          </Link>
        </div>

        <nav className="main-nav">
          <ul>
            <li>
              <button onClick={() => scrollToSection("inicio")}>Inicio</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("expositores")}>Expositores</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("inscripcion")} className="nav-cta">
                Inscríbete
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

