import { useState } from "react"; // Hook para manejar el estado del componente
import { Container, Row, Col } from "react-bootstrap"; // Componentes de Bootstrap para maquetado
import contactImg from "../assets/img/contact-img.svg"; // Imagen del contacto
import 'animate.css'; // Librería de animaciones CSS
import TrackVisibility from 'react-on-screen'; // Librería para detectar si el componente es visible en pantalla

// EmailJS para enviar correos desde el frontend
import emailjs from 'emailjs-com';

export const Contact = () => {
  // Estado inicial del formulario
  const formInitialDetails = {
    firstName: '',  // Nombre del usuario
    lastName: '',   // Apellido del usuario
    email: '',      // Correo electrónico del usuario
    phone: '',      // Número de teléfono del usuario
    message: ''     // Mensaje del usuario
  }

  // Estados para manejar los detalles del formulario, el texto del botón y el estado de envío
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Enviar');
  const [status, setStatus] = useState({});

  // Función que actualiza los detalles del formulario
  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,        // Mantenemos los valores anteriores
      [category]: value      // Actualizamos el valor modificado
    });
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene que la página se recargue al enviar el formulario
    setButtonText("enviando..."); // Cambiamos el texto del botón a "Sending..." mientras se envía el correo

    // Llamada a EmailJS para enviar el correo electrónico
    emailjs.send('service_6dmm7za', 'template_qj5wve1', {
      from_name: `${formDetails.firstName} ${formDetails.lastName}`, // Nombre completo
      from_email: formDetails.email,                                 // Correo del usuario
      phone: formDetails.phone,                                      // Teléfono
      message: formDetails.message,                                  // Mensaje
    }, 'gEutra8RyQX61IB4N')
    .then((result) => {
      setButtonText("Send"); // Restauramos el texto del botón a "Enviar"
      setFormDetails(formInitialDetails); // Limpiamos el formulario
      setStatus({ success: true, message: 'Message sent successfully' }); // Indicamos que el mensaje fue enviado
    }, (error) => {
      setButtonText("Send"); // Restauramos el texto del botón
      setStatus({ success: false, message: 'Something went wrong, please try again later.' }); // Indicamos que hubo un error
    });
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            {/* Imagen de contacto con animación */}
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            {/* Formulario de contacto */}
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Contacto</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      {/* Campo de Nombre */}
                      <input type="text" value={formDetails.firstName} placeholder="Nombre" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      {/* Campo de Apellido */}
                      <input type="text" value={formDetails.lastName} placeholder="Apellido" onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      {/* Campo de Correo */}
                      <input type="email" value={formDetails.email} placeholder="Email" onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      {/* Campo de Teléfono */}
                      <input type="tel" value={formDetails.phone} placeholder="Numero" onChange={(e) => onFormUpdate('phone', e.target.value)} />
                    </Col>
                    <Col size={12} className="px-1">
                      {/* Campo de Mensaje */}
                      <textarea rows="6" value={formDetails.message} placeholder="Escribe tu mensaje..." onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      {/* Botón de envío */}
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                    {
                      // Muestra el mensaje de estado (éxito o error)
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
