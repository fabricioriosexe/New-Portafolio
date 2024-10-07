import { useState, useEffect } from "react"; 
import { Navbar, Nav, Container } from "react-bootstrap"; // Importa los componentes de react-bootstrap para el diseño de la barra de navegación
import logo from '../assets/img/logo.svg'; // Importa el logo
import navIcon1 from '../assets/img/nav-icon1.svg'; // Importa los íconos de redes sociales
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link'; // HashLink permite hacer scroll suave entre secciones
import {
  BrowserRouter as Router
} from "react-router-dom"; // Se utiliza Router para navegar entre páginas o secciones

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home'); // Estado para marcar el link activo
  const [scrolled, setScrolled] = useState(false); // Estado para determinar si el usuario ha hecho scroll

  useEffect(() => {
    // Evento que detecta si el usuario ha hecho scroll y cambia el estado "scrolled"
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    // Agrega el evento de scroll a la ventana
    window.addEventListener("scroll", onScroll);

    // Elimina el evento cuando el componente se desmonta
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  // Función para actualizar el link activo al hacer clic en una sección
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <Router>
      {/* Navbar que cambia de clase cuando se hace scroll */}
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" /> {/* Logo del sitio web */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span> {/* Icono de hamburguesa para navegación móvil */}
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Links de navegación que cambian de clase dependiendo del estado "activeLink" */}
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Inicio</Nav.Link>
              <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
              <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Proyectos</Nav.Link>
            </Nav>
            {/* Sección para íconos de redes sociales */}
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://www.linkedin.com/in/fabricio-exequiel-rios-697b1a328/" target="_blank" rel="noopener noreferrer"><img src={navIcon1} alt="LinkedIn" /></a>
                <a href="https://github.com/fabricioriosexe" target="_blank" rel="noopener noreferrer"><img src={navIcon2} alt="GitHub" /></a>
                <a href="https://www.instagram.com/fabri_rios03/" target="_blank" rel="noopener noreferrer"><img src={navIcon3} alt="Instagram" /></a>
              </div>
              {/* Botón para hacer scroll a la sección "Connect" usando HashLink */}
              <HashLink to='#connect'>
                <button className="vvd"><span>Contactame</span></button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
