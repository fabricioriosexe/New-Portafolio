import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/Brenda Cerelli.png";
import projImg2 from "../assets/img/LoopChat.png";
import projImg3 from "../assets/img/mariofabri.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import pdf1 from "../assets/pdf/codeware.pdf";
import pdf2 from "../assets/pdf/LoopChat.pdf";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const projects = [
    {
      proyec : pdf1,
      title: "Code-Ware",
      description: "Juego sobre enseñanza de videojuegos.",
      imgUrl: projImg1,
    },
    {
      proyec: pdf2,
      title: "Loop Chat",
      description: "Chat en Tiempo Real.",
      imgUrl: projImg2,
    },
    {
      proyec:" https://github.com/fabricioriosexe/fabri-bros",
      title: "Imitacion de Super Mario 1",
      description: "Copia de Super Mario",
      imgUrl: projImg3,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Proyectos</h2>
                <p>Aquí hay algunos de los proyectos en los que he trabajado, que abarcan diversas tecnologías y enfoques, desde aplicaciones web hasta soluciones de backend.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Aplicaciones Web</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                     <a href="https://github.com/fabricioriosexe" target="__blank"><Nav.Link eventKey="second">otros</Nav.Link></a> 
                    </Nav.Item>
                  
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                              />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background" />
    </section>
  )
}
