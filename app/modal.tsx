"use client"
import { useForm } from "react-hook-form"
import type React from "react"

interface ModalProps {
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
    onClose() // Cerrar el modal después de enviar
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={onClose} className="close-button" aria-label="Cerrar">
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <h2>Formulario de Inscripción</h2>
          <p>I Simposio Internacional de Fútbol</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo:</label>
            <input
              id="nombre"
              {...register("nombre", { required: "Este campo es obligatorio" })}
              placeholder="Ingresa tu nombre"
            />
            {errors.nombre && <p className="error-message">{errors.nombre.message as string}</p>}
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
            {errors.email && <p className="error-message">{errors.email.message as string}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input id="telefono" type="tel" {...register("telefono")} placeholder="+1234567890" />
          </div>

          <div className="form-group">
            <label htmlFor="motivacion">Carta de motivación (opcional):</label>
            <textarea
              id="motivacion"
              {...register("motivacion")}
              placeholder="Cuéntanos por qué quieres participar en este simposio"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md"
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

