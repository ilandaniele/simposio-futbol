"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "../../components/header"
import Footer from "../../components/footer"

interface ExpositorDetalle {
  id: string
  nombre: string
  titulo: string
  descripcion: string
  imagen: string
  imagenes?: string[] // Array de imágenes para el carrusel
  biografia: string
  instagram?: string
  linkedin?: string
  tipo: string
}

const expositoresData: { [key: string]: ExpositorDetalle } = {
  "aaron-duran": {
    id: "aaron-duran",
    nombre: "Aaron Duran",
    titulo: "Organizador y Moderador",
    descripcion: "Entrenador de Fútbol Licencia Pro AUDEF. Kinesiólogo de alto rendimiento.",
    imagen: "/images/aaron-duran-5.jpeg",
    imagenes: ["/images/aaron-duran.jpeg", "/images/aaron-duran-2.jpeg", "/images/aaron-duran-3.jpeg", "/images/aaron-duran-4.jpeg", "/images/aaron-duran-5.jpeg"],
    biografia:
      "Entrenador de Futbol Licencia Pro AUDEF, Kinesiólogo de alto rendimiento. Organizador y moderador del I Simposio Internacional de Fútbol: Modelo de Juego Sudamericano y sus Elementos.",
    linkedin: "https://www.linkedin.com/in/aaron-alberto-duran-morales-505980219/",
    tipo: "organizador",
  },
  "gabriel-anon": {
    id: "gabriel-anon",
    nombre: "Gabriel Añón",
    titulo: "Introducción al Modelo de Juego",
    descripcion: "Entrenador de fútbol Uruguayo Licencia Pro y docente especializado en técnica y táctica.",
    imagen: "/images/gabriel-anon.jpg",
    imagenes: ["/images/gabriel-anon.jpg"],
    biografia:
      "Nacido el 6 de enero de 1964 en Montevideo, Uruguay, es un exfutbolista profesional y entrenador de fútbol con una destacada trayectoria tanto en su país como en el extranjero. Como jugador, se desempeñó en clubes de Uruguay, España, Ecuador y Chile, participando en competencias de alto nivel, incluyendo la Copa Libertadores.\n\nTras su retiro como futbolista, Añón inició su carrera como entrenador en 2004. Ha dirigido a varios equipos uruguayos, entre ellos Plaza Colonia, Rampla Juniors (logrando el ascenso a Primera División), Progreso y Central Español FC. En la actualidad, continúa vinculado al fútbol como docente contribuyendo al desarrollo, compartiendo su experiencia y conocimientos en la formación de nuevas generaciones de futbolistas y entrenadores uruguayos.",
    linkedin: "https://www.linkedin.com/in/gabriel-añon-a002077a/",
    tipo: "expositor",
  },
  "enrique-cesana": {
    id: "enrique-cesana",
    nombre: "Enrique Cesana",
    titulo: "Entrenamiento y Cultura Futbolística Sudamericana: Un Método con Identidad",
    descripcion: "Preparador Físico - Entrenador selecciones juveniles Argentina. Director y creador de GRUPOEKPO.",
    imagen: "/images/enrique-cesana-2.jpg",
    imagenes: ["/images/enrique-cesana.png", "/images/enrique-cesana-2.jpg"],
    biografia:
      "Destacado profesor de educación física y preparador físico argentino, reconocido por su amplia trayectoria en el ámbito del fútbol formativo y profesional. Graduado del Instituto Superior de Educación Física Nº 11 (ISEF Nº 11), Cesana ha dedicado su carrera al desarrollo y la preparación de futbolistas en diversas categorías.\n\nActualmente, se desempeña como preparador físico de la Selección Argentina Sub-17, Sub 20, colaborando estrechamente con la Asociación del Fútbol Argentino (AFA) en la formación de jóvenes talentos. Además, es el fundador y director de GrupoEkipo, una organización dedicada a la capacitación y formación de entrenadores y preparadores físicos.\n\nA lo largo de su carrera, ha ocupado diversos roles en el ámbito futbolístico, incluyendo Coordinador del Departamento de Profesores de Educación Física de la Fundación Leo Messi en Rosario y Director Deportivo del Club Tiro Federal. Ha trabajado como Preparador Físico en equipos como Rosario Central, Belgrano de Córdoba, Oriente Petrolero, Wilsterman, Guabirá y Deportivo Aurora.",
    instagram: "https://www.instagram.com/quiquecesana/",
    linkedin: "https://www.linkedin.com/in/quiquecesana/",
    tipo: "expositor",
  },
  "miguel-torres": {
    id: "miguel-torres",
    nombre: "Miguel Torres",
    titulo: "Entrenamiento del Portero Adaptado al Modelo de Juego",
    descripcion: "Entrenador de Arqueros fútbol formativo Universidad de Chile. Licencia Pro ANFP Chile.",
    imagen: "/images/miguel-torres.jpg",
    imagenes: ["/images/miguel-torres-cut.jpg", "/images/miguel-torres.jpg"],
    biografia:
      "Miguel Ignacio Torres Muñoz es un destacado preparador de arqueros chileno con una amplia trayectoria en el ámbito del fútbol de este país. A lo largo de su carrera, ha contribuido al desarrollo y perfeccionamiento de las habilidades técnicas y tácticas de los guardametas, demostrando un compromiso constante con el éxito de sus dirigidos.\n\nEn su rol como entrenador de arqueros, Torres ha trabajado en diversos clubes, como Real San Joaquín, Audax Italiano y en la Actualidad Universidad De Chile, aportando su experiencia y conocimientos para mejorar el rendimiento de los porteros. Su enfoque se centra en el desarrollo integral de los arqueros, abarcando aspectos técnicos, tácticos y psicológicos, lo que ha llevado a que varios de sus pupilos alcancen un alto nivel de desempeño en el fútbol profesional.",
    instagram: "https://www.instagram.com/m1guel7orres/",
    linkedin: "https://www.linkedin.com/in/miguel-ignacio-torres-muñoz-a504421a3/",
    tipo: "expositor",
  },
  "alejandro-garay": {
    id: "alejandro-garay",
    nombre: "Alejandro Garay",
    titulo: "Modelo de Juego en Selecciones Nacionales Juveniles",
    descripcion:
      "Entrenador selecciones juveniles Uruguay, Coordinador divisiones inferiores Montevideo Wanderers, Instructor Conmebol.",
    imagen: "/images/alejandro-garay.jpg",
    imagenes: ["/images/alejandro-garay-cut.jpg", "/images/alejandro-garay.jpg"],
    biografia:
      "Su carrera como director técnico comenzó en 1987, después de que una lesión a los 26 años lo apartara de las canchas como jugador. Desde entonces, ha trabajado en diversos clubes uruguayos, incluyendo Cerro, Rentistas, El Tanque, Danubio y Nacional. En 2010, se unió al proceso de selecciones juveniles de Uruguay liderado por Óscar Tabárez.\n\nGaray es reconocido por la formación de grandes futbolistas uruguayos, enfatizando la importancia de inculcar valores y habilidades tanto dentro como fuera del campo. En enero de 2022, tras más de una década de servicio, finalizó su vínculo con las selecciones juven  En enero de 2022, tras más de una década de servicio, finalizó su vínculo con las selecciones juveniles de Uruguay. A pesar de su salida, su legado en la formación de jóvenes futbolistas continúa siendo una referencia en el ámbito deportivo uruguayo. En la actualidad es el Jefe de divisiones inferiores de Montevideo Wanderers, además docente e instructor conmebol.",
    instagram: "https://www.instagram.com/alegar105/",
    tipo: "expositor",
  },
  "ivan-stirk": {
    id: "ivan-stirk",
    nombre: "Ivan Stirk",
    titulo: "Influencia de la Gestión Deportiva en la Consolidación del Modelo de Juego",
    descripcion: "Director deportivo Aucas, Gestión deportiva Atlético de San Luis, Santos Laguna, Mineros de Zacatecas, además formo parte del Cuerpo técnico selección de Nicaragua.",
    imagen: "/images/ivan-stirk.jpg",
    imagenes: ["/images/ivan-stirk.jpg", "/images/ivan-stirk-2.jpg"],
    biografia: "Información pendiente de confirmación.",
    tipo: "expositor",
  },
  "gerardo-pelusso": {
    id: "gerardo-pelusso",
    nombre: "Gerardo Pelusso",
    titulo: "Construcción de un Modelo de Juego: Un Camino de Aprendizaje y Experiencia",
    descripcion:
      "Entrenador multicampeón de Sudamérica, dirigió equipos como Nacional de Uruguay, Olimpia de Paraguay, Universidad de Chile, Independiente de Santa Fe, entre otros. Además de la Selección de Paraguay. Actualmente forma parte del GEF de Conmebol.",
    imagen: "/images/gerardo-pelusso-2.jpg",
    imagenes: ["/images/gerardo-pelusso-1.jpg", "/images/gerardo-pelusso-2.jpg"],
    biografia:
      "Oriundo de Florida, Uruguay. Inició su carrera como entrenador en 1984 con Emelec. Su trayectoria incluye la dirección técnica de grandes equipos en Uruguay, Perú, Chile, Paraguay y Colombia. Entre sus logros más destacados se encuentran: Campeón del Campeonato Uruguayo de Primera División en 2004 con Danubio FC, Campeón del Torneo Peruano en 2006 con Alianza Lima, Campeón del Campeonato Uruguayo de Primera División 2008-09 con Nacional, Semifinales Copa Libertadores 2010 con Universidad de Chile, Campeón del Torneo Clausura en 2011 con Olimpia, y Campeón de la Copa Sudamericana en 2015 con Independiente Santa Fe.\n\nEn 2020, a los 66 años, Pelusso anunció su retiro de la dirección técnica, dejando una huella importante e imborrable como gran entrenador en el fútbol sudamericano. Actualmente, comparte su experiencia y conocimientos en favor del desarrollo en el fútbol sudamericano como embajador de Conmebol y responsable del GET (Grupo Estudios Técnicos) de Conmebol.",
    instagram: "https://www.instagram.com/gerardopelussook/",
    tipo: "expositor",
  },
  "pablo-hernandez-roetti": {
    id: "pablo-hernandez-roetti",
    nombre: "Pablo Hernández Roetti",
    titulo: "Director del ITP",
    descripcion: "Director del Instituto Técnico Profesional de la Asociación Uruguaya de Entrenadores de Fútbol.",
    imagen: "/images/director.jpg",
    biografia:
      "Director del Instituto Técnico Profesional de la Asociación Uruguaya de Entrenadores de Fútbol, responsable de la certificación académica del I Simposio Internacional de Fútbol: Modelo de Juego Sudamericano y sus Elementos.",
    tipo: "organizador",
  },
}

export default function ExpositorPage() {
  const params = useParams()
  const router = useRouter()
  const [expositor, setExpositor] = useState<ExpositorDetalle | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const id = params.id as string
    if (id && expositoresData[id]) {
      setExpositor(expositoresData[id])
    } else {
      router.push("/")
    }
  }, [params.id, router])

  // Configurar el carrusel automático de imágenes
  useEffect(() => {
    if (expositor?.imagenes && expositor.imagenes.length > 1) {
      intervalRef.current = setInterval(() => {
        if (!isAnimating) {
          nextImage()
        }
      }, 10000) // Cambiado a 10 segundos
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [expositor, currentImageIndex, isAnimating])

  const nextImage = () => {
    if (isAnimating || !expositor?.imagenes) return

    setIsAnimating(true)
    setPreviousImageIndex(currentImageIndex)
    setSlideDirection("slide-left")

    setTimeout(() => {
      const nextIndex = (currentImageIndex + 1) % expositor.imagenes!.length
      setCurrentImageIndex(nextIndex)
      setSlideDirection("slide-in-right")

      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    }, 500)
  }

  const prevImage = () => {
    if (isAnimating || !expositor?.imagenes) return

    setIsAnimating(true)
    setPreviousImageIndex(currentImageIndex)
    setSlideDirection("slide-right")

    setTimeout(() => {
      const prevIndex = currentImageIndex === 0 ? expositor.imagenes!.length - 1 : currentImageIndex - 1
      setCurrentImageIndex(prevIndex)
      setSlideDirection("slide-in-left")

      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    }, 500)
  }

  // Agregar función para cambiar la imagen al hacer clic en los indicadores
  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentImageIndex || !expositor?.imagenes) return

    setIsAnimating(true)
    setPreviousImageIndex(currentImageIndex)
    const direction = index > currentImageIndex ? "slide-left" : "slide-right"
    setSlideDirection(direction)

    setTimeout(() => {
      setCurrentImageIndex(index)
      setSlideDirection(index > currentImageIndex ? "slide-in-right" : "slide-in-left")

      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    }, 500)
  }

  if (!expositor) {
    return (
      <>
        <Header />
        <main className="pt-24 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <p className="text-center">Cargando información...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Determinar a qué sección volver según el tipo
  const volverLink = expositor.tipo === "organizador" ? "/#organizadores" : "/#expositores"
  const volverTexto = expositor.tipo === "organizador" ? "Volver a Organizadores" : "Volver a Expositores"

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8 pt-24">
          <Link href={volverLink} className="volver-btn">
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
              className="mr-2"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>{volverTexto}</span>
          </Link>

          <div className="expositor-header-container">
            <h1 className="expositor-nombre">{expositor.nombre}</h1>
            {expositor.titulo && <h2 className="expositor-titulo">{`"${expositor.titulo}"`}</h2>}
          </div>

          <div className="expositor-container">
            <div className="expositor-imagen-container">
              {expositor.imagenes && expositor.imagenes.length > 1 ? (
                <div className="expositor-carousel">
                  <div className={`carousel-slide ${slideDirection}`}>
                    <img
                      src={expositor.imagenes[currentImageIndex] || "/placeholder.svg"}
                      alt={expositor.nombre}
                      className="expositor-imagen"
                    />
                  </div>

                  {/* Controles de navegación */}
                  {expositor.imagenes.length > 1 && (
                    <>
                      <button
                        className="carousel-arrow prev"
                        onClick={prevImage}
                        aria-label="Imagen anterior"
                        disabled={isAnimating}
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
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>

                      <button
                        className="carousel-arrow next"
                        onClick={nextImage}
                        aria-label="Imagen siguiente"
                        disabled={isAnimating}
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
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </>
                  )}

                  <div className="carousel-indicators-small">
                    {expositor.imagenes.map((_, index) => (
                      <span
                        key={index}
                        className={`carousel-dot ${currentImageIndex === index ? "active" : ""}`}
                        onClick={() => handleDotClick(index)}
                        style={{ cursor: "pointer" }}
                      ></span>
                    ))}
                  </div>
                </div>
              ) : (
                <Image
                  src={expositor.imagen || "/placeholder.svg"}
                  alt={expositor.nombre}
                  width={400}
                  height={400}
                  className="expositor-imagen"
                />
              )}
            </div>

            <div className="expositor-info">
              <h3>Biografía</h3>
              {expositor.biografia.split("\n\n").map((paragraph, index) => (
                <p key={index} className="expositor-bio-parrafo">
                  {paragraph}
                </p>
              ))}

              {(expositor.instagram || expositor.linkedin) && (
                <div className="expositor-redes">
                  <h3>Redes Sociales</h3>
                  <div className="flex gap-4">
                    {expositor.instagram && (
                      <a href={expositor.instagram} target="_blank" rel="noopener noreferrer" className="instagram-btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        Seguir en Instagram
                      </a>
                    )}
                    {expositor.linkedin && (
                      <a href={expositor.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                        Conectar en LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {expositor.tipo === "expositor" && (
            <div className="expositor-ponencia">
              <h3>Sobre la ponencia</h3>
              <p>
                {expositor.titulo ? (
                  <>
                    <span className="ponencia-titulo">{`"${expositor.titulo}"`}</span> - Esta ponencia forma parte del I
                    Simposio Internacional de Fútbol: Modelo de Juego Sudamericano y sus Elementos.
                  </>
                ) : (
                  "Información sobre la ponencia pendiente de confirmación."
                )}
              </p>
              <div className="ponencia-cta">
                <h4>¿Quieres asistir a esta ponencia?</h4>
                <Link href="/#inscripcion" className="inscribete-btn">
                  Inscríbete al simposio
                </Link>
              </div>
            </div>
          )}

          {expositor.tipo === "organizador" && (
            <div className="expositor-ponencia">
              <h3>Sobre el organizador</h3>
              <p>
                {expositor.nombre} es parte del equipo organizador del I Simposio Internacional de Fútbol: Modelo de
                Juego Sudamericano y sus Elementos.
              </p>
              <div className="ponencia-cta">
                <h4>¿Quieres participar en este evento?</h4>
                <Link href="/#inscripcion" className="inscribete-btn">
                  Inscríbete al simposio
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

