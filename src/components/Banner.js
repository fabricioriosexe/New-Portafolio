import { useState, useEffect } from "react";
// useState: Hook que permite gestionar el estado en componentes funcionales.
// useEffect: Hook que permite manejar efectos secundarios (como temporizadores o actualizaciones de estado).

import { Container, Row, Col } from "react-bootstrap";
// Estos componentes de Bootstrap se utilizan para crear una cuadrícula responsiva: 
// Container (contenedor), Row (fila) y Col (columna) nos ayudan a estructurar el layout.

import headerImg from "../assets/img/header-img.svg";
// Importa una imagen SVG que se usará en la sección del banner.

import { ArrowRightCircle } from 'react-bootstrap-icons';
// Importa el ícono de "flecha en círculo" desde react-bootstrap-icons, que se mostrará en el botón "Let's Connect".

import 'animate.css';
// Se importa la librería Animate.css para aplicar animaciones CSS prediseñadas al componente.

import TrackVisibility from 'react-on-screen';
// Importa la librería TrackVisibility que permite detectar si un componente está visible en la pantalla para ejecutar animaciones basadas en visibilidad.

export const Banner = () => {
  // Estado para controlar la rotación del texto
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  
  // Lista de textos que irán rotando en el banner
  const toRotate = ["Analista", "Programador", "Analista"];
  const period = 2000; // Tiempo entre cambios de texto (en milisegundos)

  useEffect(() => {
    // Este efecto se ejecuta cada vez que cambia el estado de `text`.
    let ticker = setInterval(() => {
      tick(); // Llama a la función `tick` cada vez que pasa el intervalo `delta`
    }, delta);

    return () => { clearInterval(ticker) }; // Limpia el intervalo cuando el componente se desmonta.
  }, [text]);

  // Función que controla la animación de texto rotatorio
  const tick = () => {
    let i = loopNum % toRotate.length; // Determina cuál es el texto actual a mostrar (según el índice).
    let fullText = toRotate[i]; // Texto completo que se debe mostrar en este ciclo
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
    // Si `isDeleting` es verdadero, elimina un carácter del texto; si no, añade uno.

    setText(updatedText); // Actualiza el estado `text` con el nuevo valor.

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2); // Si está eliminando, acelera el intervalo.
    }

    // Si el texto no se está eliminando y ya se ha mostrado el texto completo:
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true); // Cambia a modo eliminación
      setIndex(prevIndex => prevIndex - 1); // Ajusta el índice
      setDelta(period); // Establece un periodo de espera antes de empezar a eliminar.
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false); // Cambia a modo de escritura.
      setLoopNum(loopNum + 1); // Avanza al siguiente texto en la lista
      setIndex(1);
      setDelta(500); // Intervalo más corto al iniciar la escritura.
    } else {
      setIndex(prevIndex => prevIndex + 1); // Incrementa el índice
    }
  };

   // Nueva función que hará el scroll a la sección "Connect"
   const scrollToConnect = () => {
    const connectSection = document.getElementById("connect"); // Busca la sección con id="connect"
    if (connectSection) {
      connectSection.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
    }
  };
  return (
    <section className="banner" id="home">
      {/* Sección del banner, con un id para anclar la sección como 'home' */}
      <Container>
        <Row className="aligh-items-center">
          {/* Estructura en filas y columnas de Bootstrap para hacer el contenido responsivo */}
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => 
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  {/* Si el componente está visible en la pantalla, se aplica una animación de fadeIn */}
                  <span className="tagline">Bienvenido a mi portafolio</span>
                  {/* Muestra un mensaje de bienvenida */}
                  <h1>{`Hola, soy Fabri  `} <br></br>
                    <span className="txt-rotate" dataPeriod="1000" data-rotate='["Analista", "Developer", "UI/UX Designer"]'>
                      {/* El texto que rota entre los diferentes roles usando la lógica de estado */}
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <p>Soy un estudiante de programación. Me considero una persona
                dedicada y apasionada por el aprendizaje continuo. Disfruto no solo de adquirir nuevos conocimientos,
                sino también de compartirlos y ayudar a otros en su proceso de aprendizaje.</p>
                  {/* Breve párrafo introductorio. Este texto se puede modificar para describir al portafolio */}
                  
                  <button onClick={() =>scrollToConnect()}>
                    {/* Botón con un ícono que ejecuta una acción de conexión (en este caso, solo hace un console.log) */}
                    Contactame <ArrowRightCircle size={25} />
                  </button>
                  
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            {/* Columna que contiene la imagen */}
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  {/* Aplica una animación zoomIn cuando la imagen es visible */}
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
