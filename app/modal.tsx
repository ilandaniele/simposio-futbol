"use client"
import { useForm } from "react-hook-form"
import emailjs from "@emailjs/browser"
import type React from "react"

interface ModalProps {
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  phone?: string
  job?: string
  motivation?: string
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: data.name,
          email: data.email,
          phone: data.phone || "No proporcionado",
          job: data.job || "No proporcionado",
          motivation: data.motivation || "No proporcionado",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )

      alert("Formulario enviado con éxito 🎉")
      reset()
      onClose()
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      alert("Hubo un error al enviar el formulario. Intenta de nuevo.")
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content max-h-[90vh] overflow-y-auto">
        <div className="modal-header">
          <button onClick={onClose} className="close-button" aria-label="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <h2>Formulario de Inscripción</h2>
          <p>I Simposio Internacional de Fútbol</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Nombre completo:</label>
            <input id="name" {...register("name", { required: "Este campo es obligatorio" })} placeholder="Ingresa tu nombre" />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Dirección de email inválida",
                },
              })}
              placeholder="tu@email.com"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono:</label>
            <input
              id="phone"
              type="tel"
              {...register("phone", {
                pattern: {
                  value: /^[0-9+\-\s()]*$/,
                  message: "Por favor ingresa un número de teléfono válido",
                },
              })}
              placeholder="+1234567890"
            />
            {errors.phone && <p className="error-message">{errors.phone.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="job">Puesto de trabajo:</label>
            <input id="job" {...register("job")} placeholder="Ej: Entrenador, Preparador físico, Estudiante" />
          </div>

          <div className="form-group">
            <label htmlFor="motivation">Carta de motivación (opcional):</label>
            <textarea
              id="motivation"
              {...register("motivation")}
              placeholder="Cuéntanos por qué quieres participar en este simposio"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md"
              style={{ width: "100%", height: "80px" }}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              Inscribirme
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal
